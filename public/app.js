const API_URL = 'http://localhost:3000';

// ─── Navigation ───────────────────────────────────────────────
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(name).classList.add('active');
  event.target.classList.add('active');

  const loaders = {
    products: loadProducts,
    categories: loadCategories,
    tags: loadTags,
    sales: loadSales,
    caja: loadCaja,
    reposicion: loadReposicion,
    history: loadHistory,
  };
  if (loaders[name]) loaders[name]();
}

// ─── API Helper ───────────────────────────────────────────────
async function api(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Error ${res.status}`);
    }
    return res.status === 204 ? null : res.json();
  } catch (err) {
    showToast(err.message, 'error');
    throw err;
  }
}

// ─── Toast ────────────────────────────────────────────────────
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = `toast ${type} show`;
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── Products ─────────────────────────────────────────────────
function calculateMargin(price, costPrice) {
  if (!costPrice || costPrice === 0) return 0;
  return ((price - costPrice) / costPrice) * 100;
}

async function loadProducts() {
  const products = await api('/products');
  const categories = await api('/categories');
  const tags = await api('/tags');

  // Populate category select (preserve "Sin categoría" option)
  const catSelect = document.getElementById('prod-category');
  catSelect.innerHTML = '<option value="">Sin categoría</option>' + categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

  // Populate tags select
  const tagsSelect = document.getElementById('prod-tags');
  tagsSelect.innerHTML = tags.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

  // Populate table
  const tbody = document.getElementById('products-table');
  if (products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="empty-state">No hay productos</td></tr>';
    return;
  }
  tbody.innerHTML = products.map(p => {
    const price = parseFloat(p.price) || 0;
    const costPrice = parseFloat(p.costPrice) || 0;
    const margin = calculateMargin(price, costPrice);
    return `
    <tr>
      <td>${p.name}</td>
      <td>$${costPrice.toFixed(2)}</td>
      <td>$${price.toFixed(2)}</td>
      <td style="color: ${margin >= 0 ? '#27ae60' : '#e74c3c'}">${margin.toFixed(1)}%</td>
      <td>${p.stock}</td>
      <td>${p.category?.name || '-'}</td>
      <td>${(p.tags || []).map(t => t.name).join(', ') || '-'}</td>
      <td>
        <button class="btn btn-small" onclick="editProduct('${p.id}')">Editar</button>
        <button class="btn btn-danger btn-small" onclick="deleteProduct('${p.id}')">Eliminar</button>
      </td>
    </tr>
  `;
  }).join('');
}

async function createProduct(e) {
  e.preventDefault();
  const selectedTags = Array.from(document.getElementById('prod-tags').selectedOptions).map(o => o.value);
  const data = {
    name: document.getElementById('prod-name').value,
    price: parseFloat(document.getElementById('prod-price').value),
    costPrice: parseFloat(document.getElementById('prod-cost').value) || 0,
    stock: parseInt(document.getElementById('prod-stock').value) || 0,
    categoryId: document.getElementById('prod-category').value || undefined,
    tagIds: selectedTags.length > 0 ? selectedTags : undefined,
  };
  await api('/products', { method: 'POST', body: JSON.stringify(data) });
  showToast('Producto creado');
  document.getElementById('product-form').reset();
  loadProducts();
}

async function deleteProduct(id) {
  if (!confirm('Eliminar producto?')) return;
  await api(`/products/${id}`, { method: 'DELETE' });
  showToast('Producto eliminado');
  loadProducts();
}

// ─── Categories ───────────────────────────────────────────────
async function loadCategories() {
  const categories = await api('/categories');
  const tbody = document.getElementById('categories-table');
  if (categories.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" class="empty-state">No hay categorías</td></tr>';
    return;
  }
  tbody.innerHTML = categories.map(c => `
    <tr>
      <td>${c.name}</td>
      <td>${c.description || '-'}</td>
      <td>
        <button class="btn btn-danger btn-small" onclick="deleteCategory('${c.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

async function createCategory(e) {
  e.preventDefault();
  const data = {
    name: document.getElementById('cat-name').value,
    description: document.getElementById('cat-desc').value || undefined,
  };
  await api('/categories', { method: 'POST', body: JSON.stringify(data) });
  showToast('Categoría creada');
  document.getElementById('category-form').reset();
  loadCategories();
}

async function deleteCategory(id) {
  if (!confirm('Eliminar categoría?')) return;
  await api(`/categories/${id}`, { method: 'DELETE' });
  showToast('Categoría eliminada');
  loadCategories();
}

// ─── Tags ─────────────────────────────────────────────────────
async function loadTags() {
  const tags = await api('/tags');
  const tbody = document.getElementById('tags-table');
  if (tags.length === 0) {
    tbody.innerHTML = '<tr><td colspan="2" class="empty-state">No hay etiquetas</td></tr>';
    return;
  }
  tbody.innerHTML = tags.map(t => `
    <tr>
      <td>${t.name}</td>
      <td>
        <button class="btn btn-danger btn-small" onclick="deleteTag('${t.id}')">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

async function createTag(e) {
  e.preventDefault();
  const data = { name: document.getElementById('tag-name').value };
  await api('/tags', { method: 'POST', body: JSON.stringify(data) });
  showToast('Etiqueta creada');
  document.getElementById('tag-form').reset();
  loadTags();
}

async function deleteTag(id) {
  if (!confirm('Eliminar etiqueta?')) return;
  await api(`/tags/${id}`, { method: 'DELETE' });
  showToast('Etiqueta eliminada');
  loadTags();
}

// ─── Sales ────────────────────────────────────────────────────
let allProducts = [];

async function loadSales() {
  const sales = await api('/sales');
  allProducts = await api('/products');

  const prodSelect = document.getElementById('sale-product');
  prodSelect.innerHTML = '<option value="">Selecciona un producto</option>' + allProducts.map(p => `<option value="${p.id}">${p.name} ($${parseFloat(p.price).toFixed(2)})</option>`).join('');

  const tbody = document.getElementById('sales-table');
  if (sales.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No hay ventas</td></tr>';
    return;
  }
  tbody.innerHTML = sales.map(s => {
    const payments = s.payments || [];
    const paymentText = payments.length > 0
      ? payments.map(p => `${p.paymentMethod}: $${parseFloat(p.amount).toFixed(2)}`).join(', ')
      : '-';
    return `
    <tr>
      <td>${s.product?.name || '-'}</td>
      <td>${s.quantity}</td>
      <td>$${parseFloat(s.unitPrice).toFixed(2)}</td>
      <td>$${parseFloat(s.total).toFixed(2)}</td>
      <td>${paymentText}</td>
      <td>${new Date(s.createdAt).toLocaleString()}</td>
    </tr>
  `;
  }).join('');
}

function addPaymentRow() {
  const container = document.getElementById('payments-container');
  const row = document.createElement('div');
  row.className = 'payment-row';
  row.innerHTML = `
    <select class="payment-method">
      <option value="efectivo">Efectivo</option>
      <option value="qr">QR</option>
      <option value="transferencia">Transferencia</option>
      <option value="credito">Crédito</option>
      <option value="debito">Débito</option>
    </select>
    <input type="number" class="payment-amount" placeholder="Monto" step="0.01" min="0">
    <button type="button" class="btn-remove" onclick="removePaymentRow(this)" title="Eliminar pago">&times;</button>
  `;
  container.appendChild(row);
  row.querySelector('.payment-amount').addEventListener('input', updateSaleSummary);
  updateSaleSummary();
}

function removePaymentRow(btn) {
  btn.parentElement.remove();
  updateSaleSummary();
}

function updateSaleSummary() {
  const productSelect = document.getElementById('sale-product');
  const quantity = parseInt(document.getElementById('sale-quantity').value) || 1;
  const productId = productSelect.value;

  if (!productId) {
    document.getElementById('sale-total').textContent = '$0.00';
    document.getElementById('sale-paid').textContent = '$0.00';
    document.getElementById('sale-pending').textContent = '$0.00';
    return;
  }

  // Get product price from allProducts array
  const product = allProducts.find(p => p.id === productId);
  const price = product ? parseFloat(product.price) : 0;
  const total = price * quantity;

  // Calculate paid amount
  const paid = Array.from(document.querySelectorAll('.payment-row')).reduce((sum, row) => {
    const amount = parseFloat(row.querySelector('.payment-amount').value) || 0;
    return sum + amount;
  }, 0);

  const pending = total - paid;

  document.getElementById('sale-total').textContent = `$${total.toFixed(2)}`;
  document.getElementById('sale-paid').textContent = `$${paid.toFixed(2)}`;
  document.getElementById('sale-pending').textContent = `$${pending.toFixed(2)}`;
}

async function createSale(e) {
  e.preventDefault();
  const payments = Array.from(document.querySelectorAll('.payment-row')).map(row => ({
    amount: parseFloat(row.querySelector('.payment-amount').value) || 0,
    paymentMethod: row.querySelector('.payment-method').value,
  })).filter(p => p.amount > 0);

  const data = {
    productId: document.getElementById('sale-product').value,
    quantity: parseInt(document.getElementById('sale-quantity').value),
    payments: payments.length > 0 ? payments : undefined,
  };
  await api('/sales', { method: 'POST', body: JSON.stringify(data) });
  showToast('Venta registrada');
  document.getElementById('sale-form').reset();
  loadSales();
}

// ─── Edit Product ─────────────────────────────────────────────
async function editProduct(id) {
  const product = await api(`/products/${id}`);
  const categories = await api('/categories');
  const tags = await api('/tags');

  document.getElementById('edit-prod-id').value = product.id;
  document.getElementById('edit-prod-name').value = product.name;
  document.getElementById('edit-prod-cost').value = parseFloat(product.costPrice) || 0;
  document.getElementById('edit-prod-price').value = parseFloat(product.price);
  document.getElementById('edit-prod-stock').value = product.stock;

  const catSelect = document.getElementById('edit-prod-category');
  catSelect.innerHTML = '<option value="">Sin categoría</option>' + categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  catSelect.value = product.categoryId || '';

  const tagsSelect = document.getElementById('edit-prod-tags');
  tagsSelect.innerHTML = '<option value="">Sin etiquetas</option>' + tags.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  if (product.tags) {
    Array.from(tagsSelect.options).forEach(opt => {
      if (product.tags.find(t => t.id === opt.value)) opt.selected = true;
    });
  }

  document.getElementById('edit-product-modal').classList.add('active');
}

function closeEditModal() {
  document.getElementById('edit-product-modal').classList.remove('active');
}

async function updateProduct(e) {
  e.preventDefault();
  const id = document.getElementById('edit-prod-id').value;
  const selectedTags = Array.from(document.getElementById('edit-prod-tags').selectedOptions).map(o => o.value).filter(v => v);

  const data = {
    name: document.getElementById('edit-prod-name').value,
    price: parseFloat(document.getElementById('edit-prod-price').value),
    costPrice: parseFloat(document.getElementById('edit-prod-cost').value) || 0,
    stock: parseInt(document.getElementById('edit-prod-stock').value) || 0,
    categoryId: document.getElementById('edit-prod-category').value || undefined,
    tagIds: selectedTags.length > 0 ? selectedTags : undefined,
  };

  await api(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(data) });
  showToast('Producto actualizado');
  closeEditModal();
  loadProducts();
}

// ─── Caja ─────────────────────────────────────────────────────
async function loadCaja() {
  const summary = await api('/caja/summary');

  document.getElementById('total-sales').textContent = `$${summary.totalSales.toFixed(2)}`;
  document.getElementById('total-profit').textContent = `$${summary.totalProfit.toFixed(2)}`;
  document.getElementById('total-expenses').textContent = `$${summary.totalExpenses.toFixed(2)}`;
  document.getElementById('net-balance').textContent = `$${summary.netBalance.toFixed(2)}`;

  const salesTbody = document.getElementById('caja-sales-table');
  if (summary.sales.length === 0) {
    salesTbody.innerHTML = '<tr><td colspan="6" class="empty-state">No hay ventas</td></tr>';
  } else {
    salesTbody.innerHTML = summary.sales.map(s => `
      <tr>
        <td>${s.productName}</td>
        <td>${s.quantity}</td>
        <td>$${s.total.toFixed(2)}</td>
        <td>$${(s.costPrice * s.quantity).toFixed(2)}</td>
        <td style="color: ${s.profit >= 0 ? '#27ae60' : '#e74c3c'}">$${s.profit.toFixed(2)}</td>
        <td>${new Date(s.createdAt).toLocaleString()}</td>
      </tr>
    `).join('');
  }

  const expTbody = document.getElementById('expenses-table');
  if (summary.expenses.length === 0) {
    expTbody.innerHTML = '<tr><td colspan="4" class="empty-state">No hay gastos</td></tr>';
  } else {
    expTbody.innerHTML = summary.expenses.map(e => `
      <tr>
        <td>${e.description}</td>
        <td>$${e.amount.toFixed(2)}</td>
        <td>${new Date(e.createdAt).toLocaleString()}</td>
        <td>
          <button class="btn btn-danger btn-small" onclick="deleteExpense('${e.id}')">Eliminar</button>
        </td>
      </tr>
    `).join('');
  }
}

async function createExpense(e) {
  e.preventDefault();
  const data = {
    description: document.getElementById('expense-desc').value,
    amount: parseFloat(document.getElementById('expense-amount').value),
  };
  await api('/caja/expenses', { method: 'POST', body: JSON.stringify(data) });
  showToast('Gasto agregado');
  document.getElementById('expense-form').reset();
  loadCaja();
}

async function deleteExpense(id) {
  if (!confirm('Eliminar gasto?')) return;
  await api(`/caja/expenses/${id}`, { method: 'DELETE' });
  showToast('Gasto eliminado');
  loadCaja();
}

// ─── Reposicion ───────────────────────────────────────────────
async function loadReposicion() {
  const reposiciones = await api('/reposicion');
  const products = await api('/products');

  const prodSelect = document.getElementById('reposicion-product');
  prodSelect.innerHTML = products.map(p => `<option value="${p.id}">${p.name} (stock: ${p.stock})</option>`).join('');

  const tbody = document.getElementById('reposicion-table');
  if (reposiciones.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No hay reposiciones</td></tr>';
    return;
  }
  tbody.innerHTML = reposiciones.map(r => `
    <tr>
      <td>${r.product?.name || '-'}</td>
      <td>${r.quantity}</td>
      <td>${r.supplier || '-'}</td>
      <td>${r.cost ? '$' + r.cost.toFixed(2) : '-'}</td>
      <td>${new Date(r.createdAt).toLocaleString()}</td>
    </tr>
  `).join('');
}

async function createReposicion(e) {
  e.preventDefault();
  const data = {
    productId: document.getElementById('reposicion-product').value,
    quantity: parseInt(document.getElementById('reposicion-quantity').value),
    supplier: document.getElementById('reposicion-supplier').value || undefined,
    cost: parseFloat(document.getElementById('reposicion-cost').value) || undefined,
  };
  await api('/reposicion', { method: 'POST', body: JSON.stringify(data) });
  showToast('Reposición registrada');
  document.getElementById('reposicion-form').reset();
  loadReposicion();
}

// ─── History ──────────────────────────────────────────────────
async function loadHistory() {
  const history = await api('/history');
  const tbody = document.getElementById('history-table');
  if (history.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No hay historial</td></tr>';
    return;
  }
  tbody.innerHTML = history.map(h => `
    <tr>
      <td>${h.product?.name || '-'}</td>
      <td>${h.field}</td>
      <td>${h.oldValue || '-'}</td>
      <td>${h.newValue || '-'}</td>
      <td>${new Date(h.createdAt).toLocaleString()}</td>
    </tr>
  `).join('');
}

// ─── Init ─────────────────────────────────────────────────────
document.getElementById('product-form').addEventListener('submit', createProduct);
document.getElementById('category-form').addEventListener('submit', createCategory);
document.getElementById('tag-form').addEventListener('submit', createTag);
document.getElementById('sale-form').addEventListener('submit', createSale);
document.getElementById('expense-form').addEventListener('submit', createExpense);
document.getElementById('reposicion-form').addEventListener('submit', createReposicion);
document.getElementById('edit-product-form').addEventListener('submit', updateProduct);

// Sale form listeners
document.getElementById('sale-product').addEventListener('change', updateSaleSummary);
document.getElementById('sale-quantity').addEventListener('input', updateSaleSummary);
document.getElementById('sale-product-search').addEventListener('input', filterProducts);

function filterProducts() {
  const search = document.getElementById('sale-product-search').value.toLowerCase();
  const resultsContainer = document.getElementById('product-results');
  const filtered = allProducts.filter(p => p.name.toLowerCase().includes(search));

  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<div class="no-results">No se encontraron productos</div>';
    return;
  }

  resultsContainer.innerHTML = filtered.map(p => `
    <div class="product-result-item" onclick="selectProduct('${p.id}')">
      <div class="product-name">${p.name}</div>
      <div class="product-price">$${parseFloat(p.price).toFixed(2)} | Stock: ${p.stock}</div>
    </div>
  `).join('');
}

function selectProduct(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('sale-product').value = productId;
  document.getElementById('sale-product-search').value = `${product.name} ($${parseFloat(product.price).toFixed(2)})`;
  document.getElementById('product-results').innerHTML = '';
  updateSaleSummary();
}

// Load initial data
loadProducts();
loadSales();
