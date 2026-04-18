/* =====================================================================
   Vyasaraghatta — Prototype (v3: + rider dispatch + live tracking)
   © 2026 Sunil Malleshaiah. All rights reserved.
   ===================================================================== */

const shops = [
  { id:'s1', name:"Shanti's Home Bakery", emoji:'🥖', category:'bakery',
    meta:['1.2 km','25–30 min','4.7 ★'], tags:['Breads','Eggless'], live:true, fee:20,
    items:[
      {id:'i1',emoji:'🍞',name:'Whole wheat bread',desc:'Baked fresh at 5 AM',price:45,stock:true},
      {id:'i2',emoji:'🥐',name:'Butter croissant', desc:'Flaky, small batch',  price:35,stock:true},
      {id:'i3',emoji:'🥖',name:'Village sourdough',desc:'24-hr fermented',     price:120,stock:true},
      {id:'i4',emoji:'🍞',name:'Milk bread',       desc:'Soft, for kids',      price:40,stock:false},
    ]},
  { id:'s2', name:'Nisha Cakes & Bakes', emoji:'🎂', category:'bakery',
    meta:['2.4 km','30–40 min','4.9 ★'], tags:['Cakes','Custom'], live:false, fee:25,
    items:[
      {id:'j1',emoji:'🎂',name:'Choco truffle (500g)',desc:'Rich & dark',price:420,stock:true},
      {id:'j2',emoji:'🧁',name:'Vanilla cupcakes (6)',desc:'Kids love them',price:180,stock:true},
      {id:'j3',emoji:'🍰',name:'Red velvet slice',desc:'Classic',price:90,stock:true},
    ]},
  { id:'s3', name:'Gowda Kirana Store', emoji:'🛒', category:'grocery',
    meta:['0.8 km','20–30 min','4.5 ★'], tags:['Daily needs','Open till 10 PM'], live:true, fee:15,
    items:[
      {id:'g1',emoji:'🍚',name:'Sona masuri rice (5 kg)',desc:'Premium quality',price:340,stock:true},
      {id:'g2',emoji:'🫘',name:'Toor dal (1 kg)',desc:'Cleaned, sorted',price:175,stock:true},
      {id:'g3',emoji:'🧂',name:'Iodised salt (1 kg)',desc:'Tata',price:28,stock:true},
      {id:'g4',emoji:'🫗',name:'Sunflower oil (1 L)',desc:'Refined',price:140,stock:true},
      {id:'g5',emoji:'🧅',name:'Onions (1 kg)',desc:'Fresh',price:45,stock:true},
    ]},
  { id:'s4', name:'Raghavendra Medicals', emoji:'💊', category:'pharmacy',
    meta:['1.5 km','20–30 min','4.8 ★'], tags:['24×7','Prescription OK'], live:true, fee:20,
    items:[
      {id:'p1',emoji:'💊',name:'Paracetamol 500mg (10 tabs)',desc:'Fever, pain',price:22,stock:true},
      {id:'p2',emoji:'🧴',name:'Antiseptic liquid (100ml)',desc:'Dettol',price:80,stock:true},
      {id:'p3',emoji:'🩹',name:'Bandage roll',desc:'Cotton, 4cm',price:45,stock:true},
      {id:'p4',emoji:'🫙',name:'Electrolyte powder',desc:'ORS, sachet',price:22,stock:true},
    ]},
  { id:'s5', name:'Sri Lakshmi Tiffin Centre', emoji:'🍱', category:'food',
    meta:['1.0 km','15–25 min','4.6 ★'], tags:['Veg','Breakfast'], live:true, fee:15,
    items:[
      {id:'f1',emoji:'🥞',name:'Masala dosa',desc:'With chutney & sambar',price:60,stock:true},
      {id:'f2',emoji:'🍚',name:'Bisi bele bath',desc:'Served hot',price:70,stock:true},
      {id:'f3',emoji:'🫓',name:'Idli (3 pcs)',desc:'With chutney',price:40,stock:true},
      {id:'f4',emoji:'🍛',name:'Veg thali',desc:'Unlimited rice',price:120,stock:true},
    ]},
  { id:'s6', name:'Village Dairy', emoji:'🥛', category:'dairy',
    meta:['0.5 km','15–20 min','4.7 ★'], tags:['Fresh daily','A2 milk'], live:true, fee:10,
    items:[
      {id:'d1',emoji:'🥛',name:'A2 cow milk (1 L)',desc:'Morning fresh',price:75,stock:true},
      {id:'d2',emoji:'🧈',name:'Homemade butter (200g)',desc:'Salted',price:180,stock:true},
      {id:'d3',emoji:'🧀',name:'Curd (500g)',desc:'Set overnight',price:55,stock:true},
    ]},
  { id:'s7', name:'Basavaraj Stationers', emoji:'✏️', category:'stationery',
    meta:['1.8 km','25–35 min','4.4 ★'], tags:['School & office'], live:false, fee:20,
    items:[
      {id:'t1',emoji:'📓',name:'Notebook (200 pages)',desc:'Single line',price:55,stock:true},
      {id:'t2',emoji:'🖊️',name:'Blue pen (pack of 10)',desc:'Reynolds',price:100,stock:true},
      {id:'t3',emoji:'📏',name:'Geometry box',desc:'Natraj',price:140,stock:true},
    ]},
  { id:'s8', name:'Fresh Meat & Fish', emoji:'🍗', category:'meat',
    meta:['2.1 km','30–40 min','4.5 ★'], tags:['Cut to order','Fresh'], live:true, fee:25,
    items:[
      {id:'m1',emoji:'🍗',name:'Country chicken (1 kg)',desc:'Cleaned, cut',price:320,stock:true},
      {id:'m2',emoji:'🐟',name:'Rohu fish (500g)',desc:'Fresh catch',price:220,stock:true},
      {id:'m3',emoji:'🥚',name:'Farm eggs (dozen)',desc:'Free-range',price:95,stock:true},
    ]},
];

const riders = [
  { id:'r1', name:'Ravi Kumar',   village:'Vyasaraghatta', rating:4.8, distance:0.8, isYou:true,  willAccept:null },
  { id:'r2', name:'Mahesh G.',    village:'Hosakote',     rating:4.6, distance:1.4, isYou:false, willAccept:true  },
  { id:'r3', name:'Suresh N.',    village:'Dodballapur',  rating:4.9, distance:2.1, isYou:false, willAccept:true  },
  { id:'r4', name:'Lakshmi A.',   village:'Vyasaraghatta', rating:4.7, distance:2.8, isYou:false, willAccept:true  },
];

let dashOrders = [
  { id:'#2041', status:'new',      items:'2× Whole wheat bread, 1× Butter croissant', total:125, time:'just now' },
  { id:'#2040', status:'new',      items:'1× Village sourdough',                      total:120, time:'2 min ago' },
  { id:'#2039', status:'accepted', items:'6× Vanilla cupcakes',                       total:180, time:'8 min ago' },
  { id:'#2038', status:'ready',    items:'1× Choco truffle (500g)',                   total:420, time:'15 min ago' },
];

let dashMenu = [
  { id:'i1', emoji:'🍞', name:'Whole wheat bread', price:45,  stock:true,  sold:12 },
  { id:'i2', emoji:'🥐', name:'Butter croissant',  price:35,  stock:true,  sold:8  },
  { id:'i3', emoji:'🥖', name:'Village sourdough', price:120, stock:true,  sold:4  },
  { id:'i4', emoji:'🍞', name:'Milk bread',        price:40,  stock:false, sold:0  },
];

let currentShop = null;
let currentCat = 'all';
let searchQ = '';
let cart = {};
let activeTab = 'orders';
let selectedEmoji = '🍞';
let lastView = 'view-shop';

let currentOrder = null;
let dispatchQueue = [];
let dispatchTimer = null;
let riderOnline = true;
let riderIncomingOrder = null;
let riderActiveOrder = null;

const TRACK_STEPS = [
  { key:'placed',    label:'Order placed',        sub:'Waiting to match with a rider' },
  { key:'assigned',  label:'Rider assigned',      sub:'A neighbour is heading to the shops' },
  { key:'picking',   label:'Picking up items',    sub:'Collecting from shops' },
  { key:'on_way',    label:'On the way to you',   sub:'Your order is on its way' },
  { key:'delivered', label:'Delivered',           sub:'Enjoy!' },
];
let trackStep = 'placed';

function show(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
  updateNavActive(id);
  updateCartBar();
  if (id === 'view-checkout') {
    renderCartSummary();
    // Re-apply the current fulfilment mode so the UI reflects it (warning, address visibility)
    if (typeof setFulfilmentMode === 'function') setFulfilmentMode(fulfilmentMode || 'delivery');
  }
}

function updateNavActive(viewId) {
  document.querySelectorAll('#navCustomer button').forEach(b => b.classList.remove('active'));
  if (viewId === 'view-browse') document.querySelector('#navCustomer button:nth-child(1)').classList.add('active');
  if (viewId === 'view-checkout') document.querySelector('#navCustomer button:nth-child(2)').classList.add('active');
}

function goBackFromCheckout() { show(lastView || 'view-browse'); }

// Admin PIN for Shop mode. Change this in one place to update.
const ADMIN_PIN = '9876';
let shopUnlocked = false;
let pendingShopActivation = false;

function promptForPin() {
  // Show the PIN modal — works inside installed PWAs unlike prompt()
  const modal = document.getElementById('pinModal');
  if (modal) {
    document.getElementById('pinInput').value = '';
    document.getElementById('pinError').style.display = 'none';
    modal.classList.add('show');
    setTimeout(() => document.getElementById('pinInput').focus(), 100);
  } else {
    // Fallback if modal markup is missing
    const entered = prompt('Enter admin PIN to access Shop mode:');
    if (entered === ADMIN_PIN) {
      shopUnlocked = true;
      activateShopMode();
    } else if (entered !== null) {
      alert('Incorrect PIN.');
    }
  }
}

function submitPin() {
  const entered = document.getElementById('pinInput').value;
  if (entered === ADMIN_PIN) {
    shopUnlocked = true;
    document.getElementById('pinModal').classList.remove('show');
    activateShopMode();
  } else {
    document.getElementById('pinError').style.display = 'block';
    document.getElementById('pinInput').value = '';
    document.getElementById('pinInput').focus();
  }
}

function cancelPin() {
  document.getElementById('pinModal').classList.remove('show');
  pendingShopActivation = false;
  // Restore previous active role
  const customerBtn = document.querySelector('.role-switch button[data-role="customer"]');
  if (customerBtn) {
    document.querySelectorAll('.role-switch button').forEach(b => b.classList.remove('active'));
    customerBtn.classList.add('active');
  }
}

function activateShopMode() {
  document.querySelectorAll('.role-switch button').forEach(b => b.classList.remove('active'));
  const shopBtn = document.querySelector('.role-switch button[data-role="shop"]');
  if (shopBtn) shopBtn.classList.add('active');
  ['navCustomer','navShop','navRider'].forEach(n => document.getElementById(n).style.display = 'none');
  document.getElementById('fabAdd').style.display = 'none';
  document.getElementById('navShop').style.display = 'flex';
  cart = {}; updateCartBar();
  show('view-dash'); dashTab(activeTab);
}

document.querySelectorAll('.role-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.dataset.role;

    // Gate Shop mode behind PIN until unlocked for this session
    if (role === 'shop' && !shopUnlocked) {
      promptForPin();
      return;
    }

    document.querySelectorAll('.role-switch button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    ['navCustomer','navShop','navRider'].forEach(n => document.getElementById(n).style.display = 'none');
    document.getElementById('fabAdd').style.display = 'none';
    if (role === 'customer') {
      document.getElementById('navCustomer').style.display = 'flex';
      show('view-browse');
    } else if (role === 'shop') {
      activateShopMode();
    } else if (role === 'rider') {
      document.getElementById('navRider').style.display = 'flex';
      cart = {}; updateCartBar();
      show('view-rider');
      renderRiderView();
    }
  });
});

function renderShops() {
  const list = document.getElementById('shopList');
  const filtered = shops.filter(s => {
    const catOk = currentCat === 'all' || s.category === currentCat;
    const qOk = !searchQ || s.name.toLowerCase().includes(searchQ) || s.items.some(i => i.name.toLowerCase().includes(searchQ));
    return catOk && qOk;
  });
  if (!filtered.length) {
    list.innerHTML = `<div class="empty"><div class="em">🔍</div>No shops match that.<br/>Try another category.</div>`;
    return;
  }
  list.innerHTML = filtered.map(s => `
    <button class="shop-card" onclick="openShop('${s.id}')">
      <div class="shop-head">
        <div class="shop-icon">${s.emoji}</div>
        <div style="flex:1;">
          <div class="shop-name">${s.name}</div>
          <div class="shop-meta">${s.meta.map((m,i) => i===0 ? m : `<span class="dot">·</span>${m}`).join('')}</div>
        </div>
      </div>
      <div class="shop-tags">
        <span class="tag cat">${catLabel(s.category)}</span>
        ${s.live ? '<span class="tag live">● Open now</span>' : ''}
        ${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </button>`).join('');
}

function catLabel(c) {
  const map = { food:'Food', grocery:'Grocery', pharmacy:'Pharmacy', bakery:'Bakery',
                stationery:'Stationery', dairy:'Dairy', meat:'Meat & Fish' };
  return map[c] || c;
}

document.getElementById('catGrid').addEventListener('click', e => {
  const tile = e.target.closest('.cat-tile');
  if (!tile) return;
  document.querySelectorAll('.cat-tile').forEach(c => c.classList.remove('on'));
  tile.classList.add('on');
  currentCat = tile.dataset.cat;
  renderShops();
});

const __homeSearchEl = document.getElementById('homeSearch');
if (__homeSearchEl) {
  __homeSearchEl.addEventListener('input', e => {
    const q = e.target.value.trim();
    searchQ = q.toLowerCase();
    // When searching, show results panel; when empty, show the normal browse
    const browse = document.getElementById('browseContent');
    if (q) {
      if (browse) browse.style.display = 'none';
      renderSearchResults(q);
    } else {
      if (browse) browse.style.display = '';
      const panel = document.getElementById('searchResults');
      if (panel) panel.style.display = 'none';
      renderShops();
    }
  });
}

function openShop(id) {
  currentShop = shops.find(s => s.id === id);
  document.getElementById('shopName').textContent = currentShop.name;
  document.getElementById('shopMeta').innerHTML =
    [catLabel(currentShop.category), ...currentShop.meta]
      .map((m,i) => i===0 ? m : `<span class="dot">·</span>${m}`).join('');
  // Clear the in-shop search when entering a shop
  const ss = document.getElementById('shopSearch');
  if (ss) ss.value = '';
  renderItems('');
  lastView = 'view-shop';
  show('view-shop');
}

function filterShopItems(q) {
  renderItems((q || '').trim().toLowerCase());
}

function renderItems(filterQuery) {
  const list = document.getElementById('itemList');
  const q = (filterQuery || '').toLowerCase();
  const filteredItems = !q ? currentShop.items : currentShop.items.filter(it => {
    const hay = (it.name + ' ' + (it.desc || '')).toLowerCase();
    return q.split(/\s+/).filter(Boolean).every(w => hay.includes(w));
  });
  if (!filteredItems.length) {
    list.innerHTML = `<div class="empty"><div class="em">🔍</div>No items match "${escapeHtml(filterQuery || '')}" in this shop.</div>`;
    return;
  }
  list.innerHTML = filteredItems.map(it => {
    const qty = cart[it.id]?.qty || 0;
    const outClass = it.stock ? '' : 'out';
    const imageHTML = it.image
      ? `<img src="${it.image}" alt="" onerror="this.parentElement.innerHTML='${it.emoji}';" style="width:100%; height:100%; object-fit: cover; border-radius: 12px;">`
      : it.emoji;
    return `
      <div class="item ${outClass}">
        <div class="item-emoji">${imageHTML}</div>
        <div class="item-body">
          <div class="item-name">${it.name} ${!it.stock ? '<span class="out-tag">· sold out</span>' : ''}</div>
          <div class="item-desc">${it.desc || ''}</div>
          <div class="item-price">₹${it.price}</div>
        </div>
        <div>
          ${!it.stock ? '' :
            qty > 0 ?
              `<div class="qty">
                 <button onclick="changeQty('${it.id}', '${currentShop.id}', -1)">−</button>
                 <span>${qty}</span>
                 <button onclick="changeQty('${it.id}', '${currentShop.id}', 1)">+</button>
               </div>` :
              `<button class="add-btn" onclick="changeQty('${it.id}', '${currentShop.id}', 1)">Add</button>`
          }
        </div>
      </div>`;
  }).join('');
}

function changeQty(itemId, shopId, delta) {
  const shop = shops.find(s => s.id === shopId);
  const item = shop?.items.find(i => i.id === itemId);
  if (!item) return;
  if (!cart[itemId]) cart[itemId] = { item, qty: 0, shopId };
  cart[itemId].qty += delta;
  if (cart[itemId].qty <= 0) delete cart[itemId];
  if (currentShop && currentShop.id === shopId) {
    const ss = document.getElementById('shopSearch');
    renderItems(ss ? ss.value.trim().toLowerCase() : '');
  }
  updateCartBar();
  if (document.getElementById('view-checkout').classList.contains('active')) renderCartSummary();
}

function cartGroupedByShop() {
  const groups = {};
  Object.entries(cart).forEach(([id, c]) => {
    if (!groups[c.shopId]) groups[c.shopId] = [];
    groups[c.shopId].push({ id, ...c });
  });
  return groups;
}

function cartStats() {
  let count = 0, subtotal = 0;
  const groups = cartGroupedByShop();
  Object.values(cart).forEach(c => { count += c.qty; subtotal += c.qty * c.item.price; });
  const shopCount = Object.keys(groups).length;
  let delivery = 0;
  // No delivery fee for pickup mode
  if (typeof fulfilmentMode === 'undefined' || fulfilmentMode !== 'pickup') {
    Object.keys(groups).forEach((sid, idx) => {
      const shop = shops.find(s => s.id === sid);
      delivery += idx === 0 ? shop.fee : Math.round(shop.fee / 2);
    });
  }
  return { count, subtotal, delivery, total: subtotal + delivery, shopCount };
}

function updateCartBar() {
  const { count, total, shopCount } = cartStats();
  const active = document.querySelector('.view.active')?.id;
  const showBar = count > 0 && (active === 'view-shop' || active === 'view-browse');
  const bar = document.getElementById('cartBar');
  if (showBar) bar.classList.add('show'); else bar.classList.remove('show');
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartShopCount').textContent = shopCount;
  document.getElementById('cartTotal').textContent = total;
}

function renderCartSummary() {
  const box = document.getElementById('cartSummary');
  const groups = cartGroupedByShop();
  const shopIds = Object.keys(groups);
  if (!shopIds.length) {
    box.innerHTML = `<div class="panel"><div class="empty"><div class="em">🧺</div>Your basket is empty.</div></div>`;
    document.getElementById('placeBtn').style.display = 'none';
    return;
  }
  document.getElementById('placeBtn').style.display = '';
  const { subtotal, delivery, total } = cartStats();
  let html = '';
  shopIds.forEach((sid, idx) => {
    const shop = shops.find(s => s.id === sid);
    const fee = idx === 0 ? shop.fee : Math.round(shop.fee / 2);
    const lines = groups[sid];
    const shopSub = lines.reduce((a,l) => a + l.qty * l.item.price, 0);
    html += `
      <div class="panel cart-shop-group">
        <div class="cart-shop-head">
          <div class="shop-icon">${shop.emoji}</div>
          <div class="name">${shop.name}</div>
          <div class="fee">+ ₹${fee} fee</div>
        </div>
        ${lines.map(l => `
          <div class="cart-line">
            <div class="nm">${l.item.emoji} ${l.item.name}</div>
            <div class="controls">
              <div class="mini-qty">
                <button onclick="changeQty('${l.id}', '${sid}', -1)">−</button>
                <span>${l.qty}</span>
                <button onclick="changeQty('${l.id}', '${sid}', 1)">+</button>
              </div>
              <div class="pr">₹${l.qty * l.item.price}</div>
            </div>
          </div>`).join('')}
        <div class="row" style="border-top: 1px dashed var(--rule); margin-top: 4px; padding-top: 10px; font-weight: 600;">
          <span>Subtotal</span><span>₹${shopSub}</span>
        </div>
      </div>`;
  });
  html += `
    <div class="panel">
      <div class="row"><span>Items subtotal</span><span>₹${subtotal}</span></div>
      <div class="row"><span>Delivery (${shopIds.length} ${shopIds.length === 1 ? 'shop' : 'shops'}, single rider)</span><span>₹${delivery}</span></div>
      <div class="row total"><span>Total</span><span>₹${total}</span></div>
    </div>`;
  box.innerHTML = html;
}

function placeOrder() {
  const groups = cartGroupedByShop();
  const shopIds = Object.keys(groups);
  if (!shopIds.length) { alert('Your basket is empty.'); return; }
  const addr = document.getElementById('addr').value.trim();
  const phone = document.getElementById('phone').value.trim();
  if (!addr || !phone) { alert('Please add your address and phone number.'); return; }

  const { total, delivery } = cartStats();

  const orderShops = shopIds.map(sid => {
    const shop = shops.find(s => s.id === sid);
    const items = groups[sid].map(l => `${l.qty}× ${l.item.name}`).join(', ');
    return { id: sid, name: shop.name, emoji: shop.emoji, items };
  });

  currentOrder = {
    id: '#' + Math.floor(2042 + Math.random() * 50),
    shops: orderShops,
    total,
    delivery,
    address: addr,
    phone,
    riderPayout: delivery + 15,
  };

  document.getElementById('trackId').textContent = currentOrder.id;
  document.getElementById('trackShops').textContent =
    orderShops.length + ' ' + (orderShops.length === 1 ? 'shop' : 'shops');
  document.getElementById('trackTotal').textContent = '₹' + total;

  trackStep = 'placed';
  renderTrackSteps();
  document.getElementById('trackSearchBox').style.display = '';
  document.getElementById('trackRiderBox').style.display = 'none';
  document.getElementById('trackDoneBtn').style.display = 'none';
  document.getElementById('trackKicker').textContent = 'Order placed';
  document.getElementById('trackTitle').textContent = 'Finding a rider nearby…';
  document.getElementById('trackSub').textContent = 'We\'re notifying the closest rider first.';

  cart = {};
  updateCartBar();
  show('view-track');

  startDispatch();
}

function startDispatch() {
  dispatchQueue = riders
    .filter(r => r.isYou ? riderOnline : true)
    .slice()
    .sort((a,b) => a.distance - b.distance);
  tryNextRider();
}

function tryNextRider() {
  if (!dispatchQueue.length) {
    document.getElementById('searchTitle').textContent = 'No riders available nearby';
    document.getElementById('searchSub').textContent = 'Please try again in a few minutes.';
    return;
  }
  const rider = dispatchQueue.shift();
  document.getElementById('searchSub').textContent = `Asking ${rider.name} (${rider.distance} km away)…`;

  if (rider.isYou) {
    riderIncomingOrder = { ...currentOrder, rider, decisionMade: false };
    renderRiderView();
    clearTimeout(dispatchTimer);
    dispatchTimer = setTimeout(() => {
      if (riderIncomingOrder && !riderIncomingOrder.decisionMade) {
        riderIncomingOrder = null;
        renderRiderView();
        tryNextRider();
      }
    }, 30000);
  } else {
    clearTimeout(dispatchTimer);
    dispatchTimer = setTimeout(() => {
      if (rider.willAccept) {
        assignRider(rider);
      } else {
        tryNextRider();
      }
    }, 2500 + Math.random() * 1500);
  }
}

function assignRider(rider) {
  if (!currentOrder) return;
  currentOrder.rider = rider;

  document.getElementById('trackSearchBox').style.display = 'none';
  document.getElementById('trackRiderBox').style.display = '';
  document.getElementById('rAva').textContent = rider.name.charAt(0);
  document.getElementById('rName').textContent = rider.name;
  document.getElementById('rMeta').textContent = `From ${rider.village} · ${rider.rating} ★ · ${rider.distance} km away`;
  document.getElementById('trackKicker').textContent = 'Rider assigned';
  document.getElementById('trackTitle').textContent = `${rider.name.split(' ')[0]} is on the way to the shops`;
  document.getElementById('trackSub').textContent = `From ${rider.village} · picking up from ${currentOrder.shops.length} ${currentOrder.shops.length === 1 ? 'shop' : 'shops'}`;

  advanceTrackStep('assigned');

  if (rider.isYou) {
    riderActiveOrder = {
      ...currentOrder,
      stops: [
        ...currentOrder.shops.map(s => ({ kind:'pickup', name: s.name, emoji: s.emoji, items: s.items, done: false })),
        { kind:'drop', name:'Customer', emoji:'🏠', address: currentOrder.address, items: null, done: false },
      ],
      currentStopIdx: 0,
    };
    riderIncomingOrder = null;
    renderRiderView();
  } else {
    simulateRiderProgress();
  }
}

function simulateRiderProgress() {
  setTimeout(() => { advanceTrackStep('picking'); }, 4000);
  setTimeout(() => { advanceTrackStep('on_way'); }, 9000);
  setTimeout(() => { advanceTrackStep('delivered'); }, 14000);
}

function advanceTrackStep(stepKey) {
  trackStep = stepKey;
  renderTrackSteps();
  const step = TRACK_STEPS.find(s => s.key === stepKey);
  if (step) {
    document.getElementById('trackKicker').textContent = step.label;
    document.getElementById('trackSub').textContent = step.sub;
  }
  if (stepKey === 'picking') document.getElementById('trackTitle').textContent = 'Picking up from shops';
  if (stepKey === 'on_way') document.getElementById('trackTitle').textContent = 'On the way to you';
  if (stepKey === 'delivered') {
    document.getElementById('trackTitle').textContent = 'Delivered!';
    document.getElementById('trackSub').textContent = 'Thank you — we hope you enjoy it.';
    document.getElementById('trackDoneBtn').style.display = '';
  }
}

function renderTrackSteps() {
  const box = document.getElementById('trackSteps');
  const currentIdx = TRACK_STEPS.findIndex(s => s.key === trackStep);
  box.innerHTML = TRACK_STEPS.map((s, i) => {
    const cls = i < currentIdx ? 'done' : (i === currentIdx ? 'active' : '');
    const icon = i < currentIdx ? '✓' : (i === currentIdx ? '●' : (i+1));
    return `
      <div class="tstep ${cls}">
        <div class="dot-m">${icon}</div>
        <div class="lbl-m">${s.label}</div>
        <div class="sub-m">${s.sub}</div>
      </div>`;
  }).join('');
}

function resetToBrowse() {
  currentOrder = null;
  riderActiveOrder = null;
  show('view-browse');
}

function toggleOnline() {
  riderOnline = !riderOnline;
  const btn = document.getElementById('onlineToggle');
  btn.classList.toggle('on', riderOnline);
  document.getElementById('onlineLabel').textContent = riderOnline ? 'Online' : 'Offline';
  if (!riderOnline) {
    riderIncomingOrder = null;
    clearTimeout(dispatchTimer);
    if (currentOrder && !currentOrder.rider) {
      tryNextRider();
    }
  }
  renderRiderView();
}

function renderRiderView() {
  const box = document.getElementById('riderContent');
  const titleEl = document.getElementById('rSectionTitle');

  if (riderActiveOrder) {
    titleEl.textContent = 'Active delivery';
    renderActiveDelivery(box);
    return;
  }

  if (!riderOnline) {
    titleEl.textContent = 'You are offline';
    box.innerHTML = `
      <div class="offline-msg">
        <div class="em">🌙</div>
        <div class="ttl">You're offline</div>
        <div>Go online to receive delivery requests.</div>
      </div>`;
    return;
  }

  if (riderIncomingOrder) {
    titleEl.textContent = 'New order — respond quickly!';
    renderIncomingOrder(box, riderIncomingOrder);
    return;
  }

  titleEl.textContent = 'Waiting for orders';
  box.innerHTML = `
    <div class="offline-msg">
      <div class="em">🏍️</div>
      <div class="ttl">You're online and ready</div>
      <div>Nearby orders will appear here.<br/>
      <span style="font-size: 12px; opacity: 0.8;">Tip: switch to Customer, place an order, then come back here.</span></div>
    </div>`;
}

function renderIncomingOrder(box, order) {
  const totalKm = (order.shops.length * 0.9 + 1.2).toFixed(1);
  box.innerHTML = `
    <div class="incoming">
      <span class="new-tag">● New Order</span>
      <h3>${order.shops.length} ${order.shops.length === 1 ? 'pickup' : 'pickups'} → 1 drop-off</h3>
      <div class="dist-time">About ${totalKm} km total · ~30 min</div>

      <div class="payout-box">
        <div>
          <div class="lbl-p">You'll earn</div>
          <div class="amt">₹${order.riderPayout}</div>
        </div>
        <div style="font-size: 24px;">💰</div>
      </div>

      <div class="pickups">
        ${order.shops.map(s => `
          <div class="pickup-row">
            <div class="pi">${s.emoji}</div>
            <div class="pn"><div>${s.name}</div><div class="pd">${s.items}</div></div>
          </div>`).join('')}
        <div class="drop-row">
          <div class="pi">🏠</div>
          <div class="pn"><div>Deliver to customer</div><div class="pd">${order.address}</div></div>
        </div>
      </div>

      <div class="incoming-actions">
        <button class="btn-decline" onclick="riderDecline()">Decline</button>
        <button class="btn-accept-big" onclick="riderAccept()">Accept · ₹${order.riderPayout}</button>
      </div>
    </div>
    <p style="text-align: center; color: var(--ink-soft); font-size: 12px; margin-top: 14px;">
      ⏱ If you don't respond in 30 sec, this goes to the next nearest rider.
    </p>`;
}

function riderAccept() {
  if (!riderIncomingOrder) return;
  clearTimeout(dispatchTimer);
  riderIncomingOrder.decisionMade = true;
  const rider = riders.find(r => r.isYou);
  assignRider(rider);
}

function riderDecline() {
  if (!riderIncomingOrder) return;
  clearTimeout(dispatchTimer);
  riderIncomingOrder.decisionMade = true;
  riderIncomingOrder = null;
  renderRiderView();
  tryNextRider();
}

function renderActiveDelivery(box) {
  const o = riderActiveOrder;
  box.innerHTML = `
    <div class="panel active-delivery">
      <div class="active-head">
        <div>
          <div style="font-size: 12px; color: var(--ink-soft); text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">Order ${o.id}</div>
          <div class="ttl">${o.shops.length} pickup${o.shops.length===1?'':'s'} → drop</div>
        </div>
        <div class="pay">₹${o.riderPayout}</div>
      </div>
      ${o.stops.map((st, i) => {
        const isCurrent = i === o.currentStopIdx;
        const isDone = st.done;
        const cls = isDone ? 'done' : (isCurrent ? 'current' : '');
        const btnLabel = st.kind === 'pickup' ? 'Picked up ✓' : 'Delivered ✓';
        const btnClass = st.kind === 'pickup' ? 'stop-pickup' : 'stop-deliver';
        return `
          <div class="stop ${cls}">
            <div class="stop-icon">${isDone ? '✓' : st.emoji}</div>
            <div class="stop-body">
              <div class="nm">${st.kind === 'pickup' ? 'Pickup: ' : 'Drop to: '}${st.name}</div>
              <div class="ad">${st.address || ''}</div>
              ${st.items ? `<div class="items">${st.items}</div>` : ''}
              ${isCurrent && !isDone ? `
                <div class="stop-actions">
                  <button class="${btnClass}" onclick="completeStop(${i})">${btnLabel}</button>
                </div>` : ''}
              ${isDone ? `<div class="stop-actions"><span class="stop-done">Done</span></div>` : ''}
            </div>
          </div>`;
      }).join('')}
    </div>`;
}

function completeStop(idx) {
  const o = riderActiveOrder;
  if (!o) return;
  o.stops[idx].done = true;

  const pickupsDone = o.stops.filter(s => s.kind === 'pickup' && s.done).length;
  const totalPickups = o.stops.filter(s => s.kind === 'pickup').length;

  if (pickupsDone === 1 && totalPickups > 0) {
    if (trackStep === 'assigned') advanceTrackStep('picking');
  }
  if (pickupsDone === totalPickups && o.stops[idx].kind === 'pickup') {
    advanceTrackStep('on_way');
  }
  if (o.stops[idx].kind === 'drop') {
    advanceTrackStep('delivered');
    document.getElementById('rStatDel').textContent = parseInt(document.getElementById('rStatDel').textContent) + 1;
    const prev = parseInt(document.getElementById('rStatEarn').textContent);
    document.getElementById('rStatEarn').textContent = prev + o.riderPayout;
    setTimeout(() => {
      riderActiveOrder = null;
      renderRiderView();
    }, 1200);
    return;
  }

  o.currentStopIdx = o.stops.findIndex(s => !s.done);
  renderRiderView();
}

function dashTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.dash-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.querySelectorAll('#navShop button').forEach((b, i) => b.classList.toggle('active', (tab === 'orders' && i === 0) || (tab === 'menu' && i === 1)));
  document.getElementById('tabOrders').style.display = tab === 'orders' ? '' : 'none';
  document.getElementById('tabMenu').style.display   = tab === 'menu'   ? '' : 'none';
  document.getElementById('fabAdd').style.display    = 'none';
  if (tab === 'orders') renderOrders();
  if (tab === 'menu')   renderMenu();
}

function renderOrders() {
  const list = document.getElementById('orderList');
  if (!dashOrders.length) { list.innerHTML = `<div class="empty"><div class="em">☕</div>No orders yet. Quiet day.</div>`; return; }
  list.innerHTML = dashOrders.map(o => `
    <div class="order ${o.status === 'new' ? 'new' : ''}">
      <div class="order-head">
        <div><div class="order-id">${o.id}</div><div class="order-time">${o.time}</div></div>
        <span class="status-pill ${o.status}">${o.status}</span>
      </div>
      <div class="order-items">${o.items} · <strong>₹${o.total}</strong></div>
      <div class="order-actions">
        ${o.status === 'new' ? `
          <button class="btn-reject" onclick="orderAction('${o.id}', 'reject')">Reject</button>
          <button class="btn-accept" onclick="orderAction('${o.id}', 'accept')">Accept</button>` : ''}
        ${o.status === 'accepted' ? `<button class="btn-ready" onclick="orderAction('${o.id}', 'ready')">Mark ready</button>` : ''}
        ${o.status === 'ready' ? `<button class="btn-reject" disabled style="opacity:0.6;">Awaiting rider pickup…</button>` : ''}
      </div>
    </div>`).join('');
  document.getElementById('statPending').textContent = dashOrders.filter(o => o.status !== 'ready').length;
}

function orderAction(id, action) {
  const o = dashOrders.find(x => x.id === id);
  if (!o) return;
  if (action === 'reject') dashOrders = dashOrders.filter(x => x.id !== id);
  if (action === 'accept') o.status = 'accepted';
  if (action === 'ready')  o.status = 'ready';
  renderOrders();
}

function renderMenu() {
  // In admin mode, the Menu tab shows all shops — tap one to edit its items.
  renderShopAdmin();
}

function toggleStock(id) {
  // Kept for backward compat; now delegates to item admin
  console.log('toggleStock called', id);
}

/* NOTE: The old "Add item" modal (addModal / emojiPick) was replaced
   in v0.4.0 by the per-shop item editor (itemEditor + openItemEditor).
   The old handler block is deliberately removed — it was breaking script
   execution because the DOM elements no longer exist. */

/* =====================================================================
   VERSION & UPDATE MANAGEMENT
   ===================================================================== */

// Single source of truth — bump this on every release (also bump CACHE_VERSION in sw.js)
const APP_VERSION = '0.8.0';
const RELEASE_NOTES = [
  {
    version: '0.8.0',
    date: '18 Apr 2026',
    notes: [
      'Pickup or Delivery choice at checkout — pickup waives the delivery fee; multi-shop pickup shows a warning.',
      'Per-shop confirmation links in the WhatsApp message — shops tap their link, see the order, and reply "Ready / Need more time / Cannot fulfil" straight back to the customer on WhatsApp.',
      'Phone number now required at checkout (the shop needs it to message you back).',
      'Rider dispatch is now manual — waits until shop confirms ready and admin dispatches.',
    ],
  },
  {
    version: '0.7.1',
    date: '18 Apr 2026',
    notes: [
      'OCR language picker — tap 🌐 next to the camera button to pick from English, Kannada, Hindi, Tamil, Telugu, Malayalam, or Marathi. Each language is paired with English for mixed-script shopping lists.',
      'Language choice is remembered on the device for future scans.',
    ],
  },
  {
    version: '0.7.0',
    date: '18 Apr 2026',
    notes: [
      'Per-shop search — find items inside a single shop with a dedicated search bar on the shop page.',
      'Shop export/share — admins can export a single shop or all shops as JSON to share with the pilot admin for publishing.',
      'Remote shop sync — app auto-fetches the latest published shops from the repo on load.',
      'OCR now reads Kannada + English (previously English only).',
      'Fixed: checkout button cropped behind the bottom bars.',
    ],
  },
  {
    version: '0.6.0',
    date: '18 Apr 2026',
    notes: [
      'Customer order history — review past orders, expand to see items, and tap "Reorder" to add everything to cart again.',
      'Voice note format fixed — now records in M4A (WhatsApp-compatible) on supported phones, with clear save+forward fallback if WebM is the only option.',
      'Global search on Home — type to search across all shops and items, live as you type.',
      'OCR camera button — tap 📷, upload a photo of your shopping list, and the app reads the text to suggest items to add.',
    ],
  },
  {
    version: '0.5.0',
    date: '18 Apr 2026',
    notes: [
      'GPS location button at checkout — auto-fills delivery address from your current location.',
      'Delivery address now includes a Google Maps link in WhatsApp messages.',
      'Rider section expanded: Earnings (today/week/month with 7-day bar chart), Order history with ratings, Payout history, and full editable Profile with vehicle + bank/UPI details.',
      'Rider profile persists on the device across sessions.',
    ],
  },
  {
    version: '0.4.2',
    date: '18 Apr 2026',
    notes: [
      'CRITICAL FIX: "Send order on WhatsApp", voice recording, and shop edit buttons were completely non-functional due to a script-level error. All buttons now work.',
      'Removed leftover dead code from an old UI modal that was crashing script execution at page load.',
    ],
  },
  {
    version: '0.4.1',
    date: '17 Apr 2026',
    notes: [
      'Fixed: WhatsApp send now reliably opens on iOS, Android, desktop.',
      'Fixed: voice recording now works on iPhone Safari (uses audio/mp4).',
      'Fixed: PIN entry now uses an in-app modal (works inside installed PWA).',
      'Better error messages when mic permission is denied.',
    ],
  },
  {
    version: '0.4.0',
    date: '17 Apr 2026',
    notes: [
      'WhatsApp order flow — basket sends as pre-filled message to any contact.',
      'Voice notes on orders with auto-transcript (Kannada → English fallback).',
      'Admin-only Shop mode, unlocked with PIN.',
      'Editable shops & items — add, edit, delete with image URL and stock toggle.',
      'Shop edits persist on the device (localStorage). Reset option available.',
      '"Share another way" option uses native share sheet for SMS, Telegram, etc.',
    ],
  },
  {
    version: '0.3.2',
    date: '17 Apr 2026',
    notes: [
      'Fixed iPhone Safari showing the app at desktop zoom level.',
      'Hardened viewport settings to prevent any unwanted scaling.',
      'Forced cache refresh so all devices get the mobile layout fixes.',
    ],
  },
  {
    version: '0.3.1',
    date: '17 Apr 2026',
    notes: [
      'Mobile-first polish: fixed layout on small phones (320px–380px).',
      'Inputs no longer trigger unwanted zoom on iOS when focused.',
      'Respects iPhone notch and safe areas.',
      'Tighter typography and tap targets for one-handed use.',
    ],
  },
  {
    version: '0.3.0',
    date: '17 Apr 2026',
    notes: [
      'Added version number and in-app changelog (tap the version in the footer).',
      'New "Update available" banner appears automatically when a new version is deployed.',
      'Corrected app name spelling to Vyasaraghatta throughout.',
    ],
  },
  {
    version: '0.2.0',
    date: '17 Apr 2026',
    notes: [
      'Rider role with Online/Offline toggle and 30-second accept countdown.',
      'Nearest-first dispatch — orders fall through to the next rider if declined.',
      'Live order tracking for customers with real-time progress.',
    ],
  },
  {
    version: '0.1.0',
    date: '17 Apr 2026',
    notes: [
      'Initial prototype with Customer and Shop roles.',
      'Hyperlocal across 7 categories: food, grocery, pharmacy, bakery, stationery, dairy, meat & fish.',
      'Multi-shop basket — combine items from multiple shops into one order.',
      'Installable PWA with offline support.',
    ],
  },
];

// Populate version text in footer (hook up once DOM is ready)
function stampVersion() {
  document.querySelectorAll('[data-version]').forEach(el => {
    el.textContent = 'v' + APP_VERSION;
  });
}
stampVersion();
// Sync OCR language button label with stored preference
setTimeout(() => setOcrLanguage(ocrLanguage), 50);

// Release-notes modal
function openReleaseNotes() {
  const modal = document.getElementById('releaseModal');
  const body = document.getElementById('releaseBody');
  if (!modal || !body) return;
  body.innerHTML = RELEASE_NOTES.map(r => `
    <div class="rn-entry">
      <div class="rn-head">
        <span class="rn-ver">v${r.version}</span>
        <span class="rn-date">${r.date}</span>
      </div>
      <ul class="rn-list">
        ${r.notes.map(n => `<li>${n}</li>`).join('')}
      </ul>
    </div>
  `).join('');
  modal.classList.add('show');
}
function closeReleaseNotes() {
  const modal = document.getElementById('releaseModal');
  if (modal) modal.classList.remove('show');
}

/* =====================================================================
   SERVICE WORKER + UPDATE DETECTION
   ===================================================================== */

let waitingWorker = null;

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then(reg => {
        console.log('[Vyasaraghatta] SW registered:', reg.scope);

        // If there's already a waiting worker when we register, show banner now
        if (reg.waiting && navigator.serviceWorker.controller) {
          waitingWorker = reg.waiting;
          showUpdateBanner();
        }

        // Listen for new worker installing
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // A new SW has been installed and an old one is still in control
              // → means there is a fresh update ready to activate
              waitingWorker = newWorker;
              showUpdateBanner();
            }
          });
        });

        // Poll for updates every 30 minutes while the app is open
        setInterval(() => reg.update().catch(() => {}), 30 * 60 * 1000);
      })
      .catch(err => console.warn('[Vyasaraghatta] SW registration failed:', err));

    // When the new SW takes over, reload the page once so UI is on the fresh bundle
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
  });
}

function showUpdateBanner() {
  const banner = document.getElementById('updateBanner');
  if (banner) banner.style.display = 'flex';
}
function dismissUpdate() {
  const banner = document.getElementById('updateBanner');
  if (banner) banner.style.display = 'none';
}
function applyUpdate() {
  if (!waitingWorker) { window.location.reload(); return; }
  // Tell the waiting SW to take over; controllerchange will trigger reload
  waitingWorker.postMessage({ type: 'SKIP_WAITING' });
  // Safety fallback in case controllerchange doesn't fire
  setTimeout(() => window.location.reload(), 1500);
}

/* =====================================================================
   INSTALL PROMPT
   ===================================================================== */

let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  const banner = document.getElementById('installBanner');
  if (banner) banner.style.display = 'flex';
});

function installApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  deferredInstallPrompt.userChoice.finally(() => {
    deferredInstallPrompt = null;
    const banner = document.getElementById('installBanner');
    if (banner) banner.style.display = 'none';
  });
}

function dismissInstall() {
  const banner = document.getElementById('installBanner');
  if (banner) banner.style.display = 'none';
}

/* =====================================================================
   PERSISTENT STORAGE (localStorage-based)
   Shop/item edits survive refresh on the same device.
   ===================================================================== */

const STORAGE_KEY = 'vyasaraghatta.shops.v1';

function saveShops() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shops));
  } catch (e) {
    console.warn('Could not save shops:', e);
  }
}

function loadShops() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved) && saved.length) {
      // Replace the in-memory shops with saved version
      shops.length = 0;
      saved.forEach(s => shops.push(s));
    }
  } catch (e) {
    console.warn('Could not load shops:', e);
  }
}

function resetShopsToDefault() {
  if (!confirm('Reset all shop data to the default demo shops? This cannot be undone.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// Load saved shops on startup
loadShops();
renderShops();

// PIN input: submit on Enter key
const pinInputEl = document.getElementById('pinInput');
if (pinInputEl) {
  pinInputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') submitPin();
  });
}

/* =====================================================================
   ADMIN: SHOP MANAGEMENT (add / edit / delete shops)
   ===================================================================== */

let editingShopId = null;

function renderShopAdmin() {
  const list = document.getElementById('shopAdminList') || document.getElementById('menuList');
  if (!list) return;
  const hasPending = !!window.__remoteShopsPending;
  list.innerHTML = `
    <div class="admin-toolbar">
      <button class="primary" onclick="openShopEditor()">+ Add new shop</button>
      <button class="secondary" onclick="exportAllShops()">📤 Export all shops</button>
      ${hasPending
        ? `<button class="secondary" style="border:1px solid var(--accent); color: var(--accent-2);" onclick="applyPendingRemoteShops()">⬇️ Pull latest shops (remote updates available)</button>`
        : ''}
      <button class="secondary" onclick="resetShopsToDefault()" style="font-size: 13px;">Reset to demo shops</button>
    </div>
    <div class="admin-hint">Tap a shop to manage its items. 📤 to export a shop as JSON for sharing.</div>
    ${shops.map(s => `
      <div class="admin-row" onclick="openShopItems('${s.id}')">
        <div class="admin-emoji">${s.emoji}</div>
        <div class="admin-info">
          <div class="admin-name">${s.name}</div>
          <div class="admin-meta">${catLabel(s.category)} · ${s.items.length} items</div>
        </div>
        <div class="admin-actions" onclick="event.stopPropagation();">
          <button class="admin-btn" onclick="exportShop('${s.id}')" title="Export shop as JSON">📤</button>
          <button class="admin-btn" onclick="editShop('${s.id}')" title="Edit shop info">✏️</button>
          <button class="admin-btn danger" onclick="deleteShop('${s.id}')" title="Delete shop">×</button>
        </div>
      </div>
    `).join('')}
  `;
}

function openShopEditor(shopId) {
  editingShopId = shopId || null;
  const shop = shopId ? shops.find(s => s.id === shopId) : null;
  document.getElementById('shopEditorTitle').textContent = shop ? 'Edit shop' : 'Add new shop';
  document.getElementById('seName').value = shop ? shop.name : '';
  document.getElementById('seEmoji').value = shop ? shop.emoji : '🏪';
  document.getElementById('seCategory').value = shop ? shop.category : 'food';
  document.getElementById('seDistance').value = shop ? (shop.meta[0] || '') : '1 km';
  document.getElementById('seTime').value = shop ? (shop.meta[1] || '') : '20–30 min';
  document.getElementById('seRating').value = shop ? (shop.meta[2] || '') : '4.5 ★';
  document.getElementById('seTags').value = shop ? shop.tags.join(', ') : '';
  document.getElementById('seFee').value = shop ? shop.fee : 20;
  document.getElementById('shopEditor').classList.add('show');
}

function editShop(id) { openShopEditor(id); }

function closeShopEditor() {
  document.getElementById('shopEditor').classList.remove('show');
  editingShopId = null;
}

function saveShopEditor() {
  const name = document.getElementById('seName').value.trim();
  if (!name) { alert('Please enter a shop name.'); return; }
  const data = {
    name,
    emoji: document.getElementById('seEmoji').value.trim() || '🏪',
    category: document.getElementById('seCategory').value,
    meta: [
      document.getElementById('seDistance').value.trim() || '1 km',
      document.getElementById('seTime').value.trim() || '25–30 min',
      document.getElementById('seRating').value.trim() || '4.5 ★',
    ],
    tags: document.getElementById('seTags').value.split(',').map(t => t.trim()).filter(Boolean),
    fee: parseInt(document.getElementById('seFee').value, 10) || 20,
    live: true,
  };
  if (editingShopId) {
    const shop = shops.find(s => s.id === editingShopId);
    Object.assign(shop, data);
  } else {
    shops.push({
      id: 's_' + Date.now(),
      ...data,
      items: [],
    });
  }
  saveShops();
  closeShopEditor();
  renderShopAdmin();
  renderShops();
}

function deleteShop(id) {
  const shop = shops.find(s => s.id === id);
  if (!shop) return;
  if (!confirm(`Delete "${shop.name}"? This will remove all its items too.`)) return;
  const idx = shops.findIndex(s => s.id === id);
  shops.splice(idx, 1);
  saveShops();
  renderShopAdmin();
  renderShops();
}

/* =====================================================================
   ADMIN: ITEM MANAGEMENT (per shop, with image URL)
   ===================================================================== */

let editingShopItemsId = null;
let editingItemId = null;

function openShopItems(shopId) {
  editingShopItemsId = shopId;
  const shop = shops.find(s => s.id === shopId);
  document.getElementById('itemsAdminTitle').textContent = `Items: ${shop.name}`;
  renderItemsAdmin();
  document.getElementById('itemsAdmin').classList.add('show');
}

function closeItemsAdmin() {
  document.getElementById('itemsAdmin').classList.remove('show');
  editingShopItemsId = null;
}

function renderItemsAdmin() {
  const shop = shops.find(s => s.id === editingShopItemsId);
  if (!shop) return;
  const list = document.getElementById('itemsAdminList');
  list.innerHTML = `
    <button class="primary" onclick="openItemEditor()" style="margin-bottom: 14px;">+ Add new item</button>
    ${shop.items.length === 0 ? '<div class="empty"><div class="em">📦</div>No items yet. Add your first one.</div>' : ''}
    ${shop.items.map(it => `
      <div class="admin-row">
        <div class="admin-emoji">
          ${it.image ? `<img src="${it.image}" alt="" style="width:100%; height:100%; object-fit: cover; border-radius: 10px;" onerror="this.style.display='none'; this.parentElement.innerHTML='${it.emoji}';">` : it.emoji}
        </div>
        <div class="admin-info">
          <div class="admin-name">${it.name} ${!it.stock ? '<span style="color: var(--accent-2); font-size:11px; font-weight:600;">· SOLD OUT</span>' : ''}</div>
          <div class="admin-meta">₹${it.price} · ${it.desc || ''}</div>
        </div>
        <div class="admin-actions">
          <button class="admin-btn" onclick="editItem('${it.id}')">Edit</button>
          <button class="admin-btn danger" onclick="deleteItem('${it.id}')">×</button>
        </div>
      </div>
    `).join('')}
  `;
}

function openItemEditor(itemId) {
  editingItemId = itemId || null;
  const shop = shops.find(s => s.id === editingShopItemsId);
  const item = itemId ? shop.items.find(i => i.id === itemId) : null;
  document.getElementById('itemEditorTitle').textContent = item ? 'Edit item' : 'Add item';
  document.getElementById('ieName').value = item ? item.name : '';
  document.getElementById('ieEmoji').value = item ? item.emoji : '🛒';
  document.getElementById('iePrice').value = item ? item.price : '';
  document.getElementById('ieDesc').value = item ? (item.desc || '') : '';
  document.getElementById('ieImage').value = item ? (item.image || '') : '';
  document.getElementById('ieStock').checked = item ? item.stock !== false : true;
  updateImagePreview();
  document.getElementById('itemEditor').classList.add('show');
}

function editItem(id) { openItemEditor(id); }

function closeItemEditor() {
  document.getElementById('itemEditor').classList.remove('show');
  editingItemId = null;
}

function updateImagePreview() {
  const url = document.getElementById('ieImage').value.trim();
  const preview = document.getElementById('iePreview');
  if (!preview) return;
  if (!url) {
    preview.innerHTML = '<span style="color: var(--ink-soft); font-size: 12px;">No image — emoji will be used</span>';
    return;
  }
  preview.innerHTML = `<img src="${url}" alt="preview" style="max-width: 100%; max-height: 120px; border-radius: 10px; object-fit: cover;" onerror="this.parentElement.innerHTML='<span style=\\'color: var(--accent-2); font-size: 12px;\\'>⚠️ Image failed to load</span>';">`;
}

function saveItemEditor() {
  const shop = shops.find(s => s.id === editingShopItemsId);
  if (!shop) return;
  const name = document.getElementById('ieName').value.trim();
  const price = parseFloat(document.getElementById('iePrice').value);
  if (!name || isNaN(price)) { alert('Please enter name and price.'); return; }
  const data = {
    name,
    emoji: document.getElementById('ieEmoji').value.trim() || '🛒',
    price,
    desc: document.getElementById('ieDesc').value.trim(),
    image: document.getElementById('ieImage').value.trim(),
    stock: document.getElementById('ieStock').checked,
  };
  if (editingItemId) {
    const item = shop.items.find(i => i.id === editingItemId);
    Object.assign(item, data);
  } else {
    shop.items.push({ id: 'it_' + Date.now(), ...data });
  }
  saveShops();
  closeItemEditor();
  renderItemsAdmin();
  renderShops();
}

function deleteItem(id) {
  const shop = shops.find(s => s.id === editingShopItemsId);
  if (!shop) return;
  const item = shop.items.find(i => i.id === id);
  if (!confirm(`Delete "${item.name}"?`)) return;
  const idx = shop.items.findIndex(i => i.id === id);
  shop.items.splice(idx, 1);
  saveShops();
  renderItemsAdmin();
  renderShops();
}

/* =====================================================================
   VOICE RECORDER (MediaRecorder API) + speech-to-text (Web Speech API)
   ===================================================================== */

let mediaRecorder = null;
let audioChunks = [];
let audioBlob = null;
let audioMime = '';
let audioUrl = null;
let recognition = null;
let voiceTranscript = '';
let recordStartTime = 0;
let recordTimer = null;

function isVoiceSupported() {
  return typeof navigator !== 'undefined' &&
         navigator.mediaDevices &&
         typeof MediaRecorder !== 'undefined';
}

async function startVoiceRecording() {
  // Detailed feature checks with helpful errors
  if (!window.isSecureContext) {
    alert('Voice recording requires HTTPS. Open the app via the GitHub Pages URL (not localhost or http://).');
    return;
  }
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Voice recording is not supported on this browser.\n\nTry: Chrome on Android, or Safari on iPhone.');
    return;
  }
  if (typeof MediaRecorder === 'undefined') {
    alert('Audio recording API not available on this browser.\n\nTry Chrome on Android or update Safari.');
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioChunks = [];
    voiceTranscript = '';

    // Pick a MIME type the browser supports AND WhatsApp accepts.
    // WhatsApp accepts: mp3, m4a/mp4, ogg, aac — NOT webm.
    // Try widely-compatible formats first; webm is last-resort only.
    const candidates = [
      'audio/mp4;codecs=mp4a.40.2',   // AAC in MP4 — works on iOS Safari + modern Chrome
      'audio/mp4',
      'audio/aac',
      'audio/mpeg',                   // MP3 — rare but safe if supported
      'audio/ogg;codecs=opus',        // OGG — accepted by WhatsApp
      'audio/webm;codecs=opus',       // WebM — NOT accepted by WhatsApp, last resort
      'audio/webm',
      ''                              // let the browser pick
    ];
    let chosenMime = '';
    for (const m of candidates) {
      if (!m || (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m))) {
        chosenMime = m;
        break;
      }
    }
    console.log('[Voice] Recording as:', chosenMime || '(browser default)');
    mediaRecorder = chosenMime
      ? new MediaRecorder(stream, { mimeType: chosenMime })
      : new MediaRecorder(stream);

    mediaRecorder.addEventListener('dataavailable', e => {
      if (e.data.size > 0) audioChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const useMime = chosenMime || (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported('audio/mp4') ? 'audio/mp4' : 'audio/webm');
      audioBlob = new Blob(audioChunks, { type: useMime });
      audioMime = useMime;
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      audioUrl = URL.createObjectURL(audioBlob);
      stream.getTracks().forEach(t => t.stop());
      clearInterval(recordTimer);
      renderVoiceUI('recorded');
    });

    mediaRecorder.addEventListener('error', (e) => {
      console.error('MediaRecorder error:', e);
      alert('Recording failed. Try again.');
      stream.getTracks().forEach(t => t.stop());
      clearInterval(recordTimer);
      renderVoiceUI('idle');
    });

    mediaRecorder.start();
    recordStartTime = Date.now();
    recordTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - recordStartTime) / 1000);
      const el = document.getElementById('voiceTimer');
      if (el) el.textContent = formatTime(elapsed);
    }, 200);
    renderVoiceUI('recording');

    // Speech recognition (transcript) — only if browser supports it
    startTranscription();
  } catch (err) {
    console.error('getUserMedia error:', err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      alert('Microphone permission denied.\n\nGo to your phone Settings → Safari/Chrome → allow microphone for this site.');
    } else if (err.name === 'NotFoundError') {
      alert('No microphone found on this device.');
    } else {
      alert('Could not start recording: ' + err.message);
    }
    renderVoiceUI('idle');
  }
}

function stopVoiceRecording() {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
  }
  if (recognition) {
    try { recognition.stop(); } catch (e) {}
  }
}

function clearVoiceRecording() {
  if (audioUrl) { URL.revokeObjectURL(audioUrl); audioUrl = null; }
  audioBlob = null;
  audioChunks = [];
  voiceTranscript = '';
  renderVoiceUI('idle');
}

function startTranscription() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return; // Silent — just won't have transcript
  recognition = new SR();
  recognition.continuous = true;
  recognition.interimResults = true;
  // Try Kannada first; fall back to English if browser doesn't support it
  recognition.lang = 'kn-IN';
  let finalText = '';
  recognition.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const t = e.results[i][0].transcript;
      if (e.results[i].isFinal) finalText += t + ' ';
      else interim += t;
    }
    voiceTranscript = (finalText + interim).trim();
    const el = document.getElementById('voiceTranscript');
    if (el) el.textContent = voiceTranscript || '(listening…)';
  };
  recognition.onerror = () => {
    // If Kannada fails, retry with English once
    if (recognition.lang === 'kn-IN') {
      recognition.lang = 'en-IN';
      try { recognition.start(); } catch (e) {}
    }
  };
  try { recognition.start(); } catch (e) {}
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function renderVoiceUI(state) {
  const box = document.getElementById('voiceBox');
  if (!box) return;
  if (state === 'idle') {
    box.innerHTML = `
      <div class="voice-label">Add a voice note (optional)</div>
      <div class="voice-sub">Tell the shop exactly what you need. In any language.</div>
      <button class="voice-btn record" onclick="startVoiceRecording()">🎙️ Start recording</button>
    `;
  } else if (state === 'recording') {
    box.innerHTML = `
      <div class="voice-label voice-rec-on">
        <span class="voice-dot"></span> Recording… <span id="voiceTimer">0:00</span>
      </div>
      <div class="voice-sub" id="voiceTranscript">(listening…)</div>
      <button class="voice-btn stop" onclick="stopVoiceRecording()">⏹ Stop recording</button>
    `;
  } else if (state === 'recorded') {
    const duration = Math.floor((Date.now() - recordStartTime) / 1000);
    box.innerHTML = `
      <div class="voice-label">Voice note ready (${formatTime(duration)})</div>
      ${voiceTranscript ? `<div class="voice-sub"><strong>Transcript:</strong> ${voiceTranscript}</div>` : '<div class="voice-sub" style="color: var(--ink-soft);">No transcript captured — audio only.</div>'}
      <audio controls src="${audioUrl}" style="width: 100%; margin-top: 8px;"></audio>
      <div style="display: flex; gap: 8px; margin-top: 8px;">
        <button class="voice-btn secondary" onclick="clearVoiceRecording()">Re-record</button>
      </div>
    `;
  }
}

/* =====================================================================
   WHATSAPP SHARE — replaces fake "Place order"
   ===================================================================== */

function buildOrderMessage() {
  const groups = cartGroupedByShop();
  const shopIds = Object.keys(groups);
  const { subtotal, delivery, total } = cartStats();
  const addrEl = document.getElementById('addr');
  const phoneEl = document.getElementById('phone');
  const addr = (addrEl && addrEl.value.trim()) || '(not provided)';
  const phone = (phoneEl && phoneEl.value.trim()) || '';
  const mode = fulfilmentMode || 'delivery';

  // Generate a short order ID the shops can reference
  const orderId = 'VG' + Math.floor(10000 + Math.random() * 90000);

  let msg = `🧺 *New Vyasaraghatta Order*\n`;
  msg += mode === 'pickup' ? `🚶 *Pickup* — customer will collect\n\n` : `🏍️ *Delivery* — needs a rider\n\n`;

  shopIds.forEach(sid => {
    const shop = shops.find(s => s.id === sid);
    const lines = groups[sid];
    msg += `*${shop.name}* ${shop.emoji}\n`;
    const shopItems = lines.map(l => ({ n: l.item.name, q: l.qty }));
    const shopTotal = lines.reduce((a,l) => a + l.qty * l.item.price, 0);
    lines.forEach(l => {
      msg += `  • ${l.qty}× ${l.item.name} — ₹${l.qty * l.item.price}\n`;
    });
    // Build the confirmation link for THIS shop (per-shop URL)
    const confirmLink = buildConfirmLink(orderId, sid, shop.name, phone, '', shopItems, shopTotal, mode);
    msg += `  👉 *Shop:* tap here when ready: ${confirmLink}\n`;
    msg += `\n`;
  });

  msg += `_Subtotal: ₹${subtotal}_\n`;
  if (mode === 'delivery') msg += `_Delivery: ₹${delivery}_\n`;
  msg += `*Total: ₹${total}*\n\n`;

  if (mode === 'delivery') {
    msg += `📍 Deliver to: ${addr}\n`;
    if (window.__lastGpsCoords) {
      const c = window.__lastGpsCoords;
      msg += `📡 Map: https://maps.google.com/?q=${c.lat},${c.lng} (±${c.accuracy}m)\n`;
    }
  }
  msg += `📞 Customer: ${phone || '(not provided)'}\n`;
  msg += `🔖 Order ID: ${orderId}\n`;

  if (voiceTranscript) {
    msg += `\n🎙️ *Voice note transcript:*\n"${voiceTranscript}"\n`;
  }
  if (audioBlob) {
    msg += `\n_(Customer has a voice note — will send separately.)_\n`;
  }
  msg += `\n— Sent via Vyasaraghatta`;

  // Stash the orderId so saveOrderToHistory can use it
  window.__lastOrderId = orderId;
  return msg;
}

function sendViaWhatsApp() {
  if (Object.keys(cart).length === 0) { alert('Your basket is empty.'); return; }
  // Phone is required for the confirm-link return flow
  const phoneEl = document.getElementById('phone');
  const phone = (phoneEl && phoneEl.value.trim().replace(/\D/g, '')) || '';
  if (phone.length < 10) {
    alert('Please enter your 10-digit phone number — the shop needs it to message you back when your order is ready.');
    if (phoneEl) phoneEl.focus();
    return;
  }
  // For delivery, address is also required
  if (fulfilmentMode === 'delivery') {
    const addrEl = document.getElementById('addr');
    const addr = (addrEl && addrEl.value.trim()) || '';
    if (addr.length < 5) {
      alert('Please enter a delivery address — or switch to Pickup.');
      if (addrEl) addrEl.focus();
      return;
    }
  }
  const msg = buildOrderMessage();
  const encoded = encodeURIComponent(msg);

  // wa.me works on all platforms when WhatsApp is installed.
  // On iOS Safari, window.open is sometimes blocked from non-direct user
  // gestures, so we use location.href as the primary path.
  const url = `https://wa.me/?text=${encoded}`;

  // Use a temporary anchor and click() — this is the most reliable
  // way to trigger an external app from a button across iOS, Android, desktop.
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Don't auto-clear the cart — wait for user to confirm they sent it.
  // (Previously cart was cleared immediately, which was confusing if WA didn't open.)
  setTimeout(() => {
    if (confirm('Did the WhatsApp message send successfully?')) {
      afterOrderSent();
    }
  }, 1500);
}

// Helper: pick the best file extension from the mime type
function audioExtFromMime(mime) {
  if (!mime) return 'm4a';
  if (mime.includes('mp4') || mime.includes('aac')) return 'm4a';
  if (mime.includes('mpeg')) return 'mp3';
  if (mime.includes('ogg')) return 'ogg';
  if (mime.includes('webm')) return 'webm';
  return 'audio';
}

// Detect whether current recording is in a format WhatsApp will accept.
function isWhatsAppFriendly(mime) {
  if (!mime) return false;
  return mime.includes('mp4') || mime.includes('aac') ||
         mime.includes('mpeg') || mime.includes('ogg');
}

async function sendViaShareSheet() {
  if (Object.keys(cart).length === 0) { alert('Your basket is empty.'); return; }
  const msg = buildOrderMessage();
  if (navigator.share) {
    try {
      const shareData = { title: 'Vyasaraghatta order', text: msg };
      // Try to attach audio file only if format is friendly to messaging apps
      if (audioBlob && isWhatsAppFriendly(audioMime) && navigator.canShare) {
        const ext = audioExtFromMime(audioMime);
        const file = new File([audioBlob], `voice-note.${ext}`, { type: audioMime });
        if (navigator.canShare({ files: [file] })) {
          shareData.files = [file];
        }
      }
      await navigator.share(shareData);
      afterOrderSent();
    } catch (err) {
      if (err.name !== 'AbortError') console.warn('Share failed:', err);
    }
  } else {
    // Fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(msg);
      alert('Order copied to clipboard. Paste it into any chat app.');
      afterOrderSent();
    } catch (e) {
      alert('Sharing not supported on this browser. Please use WhatsApp option.');
    }
  }
}

function afterOrderSent() {
  // Save the order to customer history BEFORE clearing
  saveOrderToHistory();

  // If we have a voice note, offer to save + forward manually
  if (audioBlob) {
    const friendly = isWhatsAppFriendly(audioMime);
    const msg = friendly
      ? 'Order sent! Would you like to save your voice note so you can attach it to the WhatsApp chat?'
      : '⚠️ Your phone recorded the voice note in WebM format, which WhatsApp does not accept as a voice file.\n\nWe\'ll save the file — you can attach it to WhatsApp manually as a document (long-press the 📎 attachment → Document). The transcript is already in the text message.';
    const confirmed = confirm(msg);
    if (confirmed) {
      const ext = audioExtFromMime(audioMime);
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `voice-order-${Date.now()}.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  cart = {};
  clearVoiceRecording();
  updateCartBar();
  show('view-browse');
  setTimeout(() => alert('Order shared! The shop or your contact will confirm.'), 300);
}

/* =====================================================================
   GPS / CURRENT LOCATION for customer checkout
   Uses browser geolocation + free Nominatim reverse-geocode
   ===================================================================== */

function useMyLocation() {
  const icon = document.getElementById('gpsIcon');
  const label = document.getElementById('gpsLabel');
  const status = document.getElementById('gpsStatus');
  const addrInput = document.getElementById('addr');
  if (!navigator.geolocation) {
    status.textContent = '⚠️ Location not supported on this browser';
    status.className = 'gps-status err';
    return;
  }
  icon.textContent = '⏳';
  label.textContent = 'Finding…';
  status.textContent = 'Please allow location access when prompted.';
  status.className = 'gps-status';

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const { latitude, longitude, accuracy } = pos.coords;
      status.textContent = `📡 Got location (±${Math.round(accuracy)}m). Looking up address…`;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
          { headers: { 'Accept-Language': 'en' } }
        );
        if (!res.ok) throw new Error('Lookup failed');
        const data = await res.json();
        // Build a short human-friendly address
        const a = data.address || {};
        const parts = [
          a.house_number, a.road, a.neighbourhood || a.suburb,
          a.village || a.town || a.city, a.state
        ].filter(Boolean);
        const addr = parts.join(', ') || data.display_name || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        addrInput.value = addr;
        status.innerHTML = `✓ Location set. <a href="https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=18" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: underline;">View on map</a>`;
        status.className = 'gps-status ok';
        // Stash coords for the WhatsApp message
        window.__lastGpsCoords = { lat: latitude, lng: longitude, accuracy: Math.round(accuracy) };
      } catch (e) {
        // Fallback: just use coords
        addrInput.value = `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
        status.textContent = `✓ Location set (${Math.round(accuracy)}m accuracy). Could not resolve to address — coords filled instead.`;
        status.className = 'gps-status ok';
        window.__lastGpsCoords = { lat: latitude, lng: longitude, accuracy: Math.round(accuracy) };
      }
      icon.textContent = '📍';
      label.textContent = 'GPS';
    },
    (err) => {
      const msg =
        err.code === 1 ? 'Permission denied. Enable location in Settings → Safari → Location.' :
        err.code === 2 ? 'Position unavailable. Try outside or near a window.' :
        err.code === 3 ? 'Request timed out. Try again.' :
        'Could not get location.';
      status.textContent = '✗ ' + msg;
      status.className = 'gps-status err';
      icon.textContent = '📍';
      label.textContent = 'GPS';
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 30000 }
  );
}

/* =====================================================================
   RIDER — Tabs (Orders / Earnings / History / Profile)
   ===================================================================== */

let currentRiderTab = 'orders';

const RIDER_PROFILE_KEY = 'vyasaraghatta.rider.profile.v1';
const RIDER_HISTORY_KEY = 'vyasaraghatta.rider.history.v1';
const RIDER_PAYOUT_KEY  = 'vyasaraghatta.rider.payouts.v1';

function loadRiderProfile() {
  try {
    const raw = localStorage.getItem(RIDER_PROFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    name: 'Ravi Kumar',
    phone: '9876543210',
    village: 'Vyasaraghatta',
    vehicle: 'Bike',
    vehicleNumber: 'KA 01 AB 1234',
    aadhaar: '',
    licence: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
    upiId: '',
    joinedDate: 'Jan 2026',
  };
}

function saveRiderProfile(p) {
  try { localStorage.setItem(RIDER_PROFILE_KEY, JSON.stringify(p)); } catch (e) {}
}

function loadRiderHistory() {
  try {
    const raw = localStorage.getItem(RIDER_HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // Seeded demo history
  const now = Date.now();
  return [
    { id: 'VG2041', date: now - 2*3600*1000,  shops: ['Gowda Kirana'], earnings: 45, rating: 5, distance: '2.1 km' },
    { id: 'VG2038', date: now - 5*3600*1000,  shops: ["Nisha Cakes"], earnings: 60, rating: 5, distance: '3.0 km' },
    { id: 'VG2034', date: now - 8*3600*1000,  shops: ['Shanti Bakery', 'Village Dairy'], earnings: 95, rating: 4, distance: '4.2 km' },
    { id: 'VG2029', date: now - 26*3600*1000, shops: ['Sri Lakshmi Tiffin'], earnings: 40, rating: 5, distance: '1.8 km' },
    { id: 'VG2024', date: now - 28*3600*1000, shops: ['Raghavendra Medicals'], earnings: 55, rating: 5, distance: '2.5 km' },
    { id: 'VG2018', date: now - 3*86400*1000, shops: ['Fresh Meat & Fish'], earnings: 70, rating: 4, distance: '2.8 km' },
    { id: 'VG2015', date: now - 3*86400*1000, shops: ['Gowda Kirana', "Nisha Cakes"], earnings: 110, rating: 5, distance: '5.1 km' },
    { id: 'VG2009', date: now - 5*86400*1000, shops: ['Village Dairy'], earnings: 35, rating: 5, distance: '1.2 km' },
    { id: 'VG2003', date: now - 8*86400*1000, shops: ['Shanti Bakery'], earnings: 50, rating: 3, distance: '2.3 km' },
    { id: 'VG1998', date: now - 12*86400*1000, shops: ['Basavaraj Stationers'], earnings: 45, rating: 5, distance: '2.0 km' },
    { id: 'VG1992', date: now - 15*86400*1000, shops: ['Sri Lakshmi Tiffin', 'Madhu Sweets'], earnings: 90, rating: 4, distance: '4.5 km' },
    { id: 'VG1987', date: now - 18*86400*1000, shops: ['Raghavendra Medicals'], earnings: 55, rating: 5, distance: '2.7 km' },
  ];
}

function loadRiderPayouts() {
  try {
    const raw = localStorage.getItem(RIDER_PAYOUT_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  const now = Date.now();
  return [
    { id: 'PAY-2026-W14', period: 'Apr 7–13, 2026',  amount: 1840, deliveries: 32, status: 'paid',    paidOn: now - 3*86400*1000, method: 'UPI' },
    { id: 'PAY-2026-W13', period: 'Mar 31–Apr 6',    amount: 2105, deliveries: 38, status: 'paid',    paidOn: now - 10*86400*1000, method: 'UPI' },
    { id: 'PAY-2026-W12', period: 'Mar 24–30, 2026', amount: 1925, deliveries: 34, status: 'paid',    paidOn: now - 17*86400*1000, method: 'Bank' },
    { id: 'PAY-2026-W15', period: 'Apr 14–20, 2026', amount:  555, deliveries: 10, status: 'pending', paidOn: null, method: 'UPI' },
  ];
}

let riderProfile = loadRiderProfile();
let riderHistory = loadRiderHistory();
let riderPayouts = loadRiderPayouts();

function riderTab(tab) {
  currentRiderTab = tab;
  document.querySelectorAll('#navRider button').forEach((b, i) => {
    const tabs = ['orders','earnings','history','profile'];
    b.classList.toggle('active', tabs[i] === tab);
  });
  const titles = {
    orders: 'Incoming orders',
    earnings: 'Earnings',
    history: 'Past deliveries',
    profile: 'Profile & documents'
  };
  document.getElementById('rSectionTitle').textContent = titles[tab];

  if (tab === 'orders')   renderRiderView();
  if (tab === 'earnings') renderRiderEarnings();
  if (tab === 'history')  renderRiderHistory();
  if (tab === 'profile')  renderRiderProfile();
}

/* ---------- Earnings ---------- */

function sumRange(days) {
  const cutoff = Date.now() - days * 86400 * 1000;
  return riderHistory
    .filter(o => o.date >= cutoff)
    .reduce((a, o) => a + o.earnings, 0);
}

function countRange(days) {
  const cutoff = Date.now() - days * 86400 * 1000;
  return riderHistory.filter(o => o.date >= cutoff).length;
}

function renderRiderEarnings() {
  const box = document.getElementById('riderContent');
  const today = sumRange(1);
  const week = sumRange(7);
  const month = sumRange(30);
  const todayCount = countRange(1);
  const weekCount = countRange(7);
  const monthCount = countRange(30);

  // Group last 7 days for bar chart
  const days = [];
  for (let d = 6; d >= 0; d--) {
    const start = new Date();
    start.setHours(0,0,0,0);
    start.setDate(start.getDate() - d);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const total = riderHistory
      .filter(o => o.date >= start.getTime() && o.date < end.getTime())
      .reduce((a, o) => a + o.earnings, 0);
    days.push({
      label: start.toLocaleDateString('en-IN', { weekday: 'short' }),
      value: total,
    });
  }
  const max = Math.max(...days.map(d => d.value), 1);

  const pending = riderPayouts.find(p => p.status === 'pending');
  const paidTotal = riderPayouts.filter(p => p.status === 'paid').reduce((a,p) => a + p.amount, 0);

  box.innerHTML = `
    <div class="earn-cards">
      <div class="earn-card">
        <div class="earn-lbl">Today</div>
        <div class="earn-val">₹${today}</div>
        <div class="earn-sub">${todayCount} ${todayCount === 1 ? 'delivery' : 'deliveries'}</div>
      </div>
      <div class="earn-card">
        <div class="earn-lbl">This week</div>
        <div class="earn-val">₹${week}</div>
        <div class="earn-sub">${weekCount} deliveries</div>
      </div>
      <div class="earn-card">
        <div class="earn-lbl">This month</div>
        <div class="earn-val">₹${month}</div>
        <div class="earn-sub">${monthCount} deliveries</div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Last 7 days</div>
      <div class="bar-chart">
        ${days.map(d => `
          <div class="bar-col">
            <div class="bar-val">₹${d.value}</div>
            <div class="bar" style="height: ${Math.round((d.value / max) * 100)}%;"></div>
            <div class="bar-label">${d.label}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Payouts</div>
      ${pending ? `
        <div class="payout-pending">
          <div>
            <div style="font-weight: 600; font-size: 15px;">₹${pending.amount} pending</div>
            <div style="font-size: 12px; color: var(--ink-soft);">${pending.period} · ${pending.deliveries} deliveries</div>
          </div>
          <span class="status-pill new">Settling Mon</span>
        </div>
      ` : ''}
      <div class="payout-summary">
        Lifetime paid: <strong>₹${paidTotal.toLocaleString('en-IN')}</strong>
      </div>
      <button class="secondary" onclick="riderTab('history'); setTimeout(()=>document.getElementById('showPayouts').click(), 50);" style="margin-top: 8px;">View payout history →</button>
    </div>

    <div class="panel" style="background: var(--paper-2); border-style: dashed;">
      <div style="font-size: 12px; color: var(--ink-soft);">
        💡 <strong>Prototype note:</strong> Earnings shown are from simulated deliveries on this device. In the real app, these come from the payment backend.
      </div>
    </div>
  `;
}

/* ---------- History (with toggle to payouts) ---------- */

let historyView = 'orders';

function renderRiderHistory() {
  const box = document.getElementById('riderContent');
  box.innerHTML = `
    <div class="history-toggle">
      <button id="showOrders" class="${historyView === 'orders' ? 'active' : ''}" onclick="setHistoryView('orders')">Orders</button>
      <button id="showPayouts" class="${historyView === 'payouts' ? 'active' : ''}" onclick="setHistoryView('payouts')">Payouts</button>
    </div>
    <div id="historyBody"></div>
  `;
  renderHistoryBody();
}

function setHistoryView(v) {
  historyView = v;
  document.getElementById('showOrders').classList.toggle('active', v === 'orders');
  document.getElementById('showPayouts').classList.toggle('active', v === 'payouts');
  renderHistoryBody();
}

function renderHistoryBody() {
  const body = document.getElementById('historyBody');
  if (!body) return;
  if (historyView === 'orders') {
    if (!riderHistory.length) {
      body.innerHTML = '<div class="empty"><div class="em">📦</div>No deliveries yet.</div>';
      return;
    }
    body.innerHTML = riderHistory.map(o => `
      <div class="history-item">
        <div class="history-left">
          <div class="history-id">${o.id}</div>
          <div class="history-meta">${formatDateShort(o.date)} · ${o.distance} · ${o.shops.join(', ')}</div>
          <div class="history-rating">${renderStars(o.rating)}</div>
        </div>
        <div class="history-right">
          <div class="history-amount">₹${o.earnings}</div>
        </div>
      </div>
    `).join('');
  } else {
    body.innerHTML = riderPayouts.map(p => `
      <div class="history-item">
        <div class="history-left">
          <div class="history-id">${p.id}</div>
          <div class="history-meta">${p.period} · ${p.deliveries} deliveries · ${p.method}</div>
          <div class="history-meta" style="color: ${p.status === 'paid' ? 'var(--ok)' : 'var(--warn)'}; font-weight: 600;">
            ${p.status === 'paid' ? '✓ Paid on ' + formatDateShort(p.paidOn) : '⏳ Pending — settles Monday'}
          </div>
        </div>
        <div class="history-right">
          <div class="history-amount">₹${p.amount.toLocaleString('en-IN')}</div>
        </div>
      </div>
    `).join('');
  }
}

function formatDateShort(ts) {
  const d = new Date(ts);
  const hours = Math.floor((Date.now() - ts) / 3600000);
  if (hours < 1) return 'just now';
  if (hours < 24) return hours + 'h ago';
  const days = Math.floor(hours / 24);
  if (days < 7) return days + 'd ago';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function renderStars(n) {
  let s = '';
  for (let i = 0; i < 5; i++) s += i < n ? '★' : '☆';
  return `<span style="color: #f59e0b; font-size: 13px;">${s}</span>`;
}

/* ---------- Profile ---------- */

function renderRiderProfile() {
  const box = document.getElementById('riderContent');
  const p = riderProfile;
  box.innerHTML = `
    <div class="panel">
      <div class="panel-title">Personal</div>
      <div class="profile-field"><span class="lbl">Full name</span>
        <input id="pf_name" type="text" value="${escapeHtml(p.name)}" />
      </div>
      <div class="profile-field"><span class="lbl">Phone number</span>
        <input id="pf_phone" type="tel" value="${escapeHtml(p.phone)}" />
      </div>
      <div class="profile-field"><span class="lbl">Village / Area</span>
        <input id="pf_village" type="text" value="${escapeHtml(p.village)}" />
      </div>
      <div class="profile-field"><span class="lbl">Joined</span>
        <input type="text" value="${escapeHtml(p.joinedDate)}" disabled />
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Vehicle</div>
      <div class="profile-field"><span class="lbl">Vehicle type</span>
        <select id="pf_vehicle">
          <option ${p.vehicle==='Bike'?'selected':''}>Bike</option>
          <option ${p.vehicle==='Scooter'?'selected':''}>Scooter</option>
          <option ${p.vehicle==='Bicycle'?'selected':''}>Bicycle</option>
          <option ${p.vehicle==='Auto'?'selected':''}>Auto</option>
          <option ${p.vehicle==='Walker'?'selected':''}>Walker</option>
        </select>
      </div>
      <div class="profile-field"><span class="lbl">Vehicle number</span>
        <input id="pf_vehicleNumber" type="text" placeholder="e.g. KA 01 AB 1234" value="${escapeHtml(p.vehicleNumber)}" />
      </div>
    </div>

    <div class="panel">
      <div class="panel-title">Documents</div>
      <div class="profile-field"><span class="lbl">Aadhaar number (last 4)</span>
        <input id="pf_aadhaar" type="text" placeholder="XXXX" maxlength="4" value="${escapeHtml(p.aadhaar)}" />
      </div>
      <div class="profile-field"><span class="lbl">Driving licence number</span>
        <input id="pf_licence" type="text" placeholder="e.g. KA01 20210001234" value="${escapeHtml(p.licence)}" />
      </div>
      <div class="doc-hint">In the real app, you'll upload photos of these documents for verification.</div>
    </div>

    <div class="panel">
      <div class="panel-title">Payout details</div>
      <div class="profile-field"><span class="lbl">UPI ID (preferred)</span>
        <input id="pf_upiId" type="text" placeholder="yourname@upi" value="${escapeHtml(p.upiId)}" />
      </div>
      <div class="profile-field"><span class="lbl">Bank name</span>
        <input id="pf_bankName" type="text" placeholder="e.g. Canara Bank" value="${escapeHtml(p.bankName)}" />
      </div>
      <div class="profile-field"><span class="lbl">Account number</span>
        <input id="pf_accountNumber" type="text" placeholder="Account number" value="${escapeHtml(p.accountNumber)}" />
      </div>
      <div class="profile-field"><span class="lbl">IFSC code</span>
        <input id="pf_ifsc" type="text" placeholder="e.g. CNRB0001234" value="${escapeHtml(p.ifsc)}" />
      </div>
    </div>

    <button class="primary" onclick="saveRiderProfileFromForm()">Save profile</button>
    <button class="secondary" style="margin-top: 8px;" onclick="riderTab('orders')">Cancel</button>
  `;
}

function saveRiderProfileFromForm() {
  const fields = ['name','phone','village','vehicle','vehicleNumber','aadhaar','licence','bankName','accountNumber','ifsc','upiId'];
  fields.forEach(f => {
    const el = document.getElementById('pf_' + f);
    if (el) riderProfile[f] = el.value.trim();
  });
  saveRiderProfile(riderProfile);
  // Also update the rider header name
  const nameEl = document.querySelector('.rider-header .name');
  const vilEl = document.querySelector('.rider-header .vil');
  if (nameEl) nameEl.textContent = riderProfile.name;
  if (vilEl) vilEl.textContent = 'From ' + riderProfile.village + ' · 4.8 ★';
  alert('✓ Profile saved.');
  riderTab('orders');
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/* =====================================================================
   CUSTOMER ORDER HISTORY (device-local)
   ===================================================================== */

const CUSTOMER_HISTORY_KEY = 'vyasaraghatta.orders.v1';

function loadCustomerHistory() {
  try {
    const raw = localStorage.getItem(CUSTOMER_HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function persistCustomerHistory(list) {
  try { localStorage.setItem(CUSTOMER_HISTORY_KEY, JSON.stringify(list.slice(0, 50))); } catch (e) {}
}

// Called from afterOrderSent(): snapshot cart + details into history
function saveOrderToHistory() {
  try {
    const groups = cartGroupedByShop();
    const shopIds = Object.keys(groups);
    if (!shopIds.length) return;
    const { subtotal, delivery, total } = cartStats();
    const entry = {
      id: 'VG' + Math.floor(10000 + Math.random() * 90000),
      date: Date.now(),
      shops: shopIds.map(sid => {
        const shop = shops.find(s => s.id === sid);
        return {
          name: shop.name,
          emoji: shop.emoji,
          items: groups[sid].map(l => ({ name: l.item.name, qty: l.qty, price: l.item.price, emoji: l.item.emoji })),
        };
      }),
      subtotal, delivery, total,
      address: (document.getElementById('addr') || {}).value || '',
      phone: (document.getElementById('phone') || {}).value || '',
      transcript: voiceTranscript || '',
      gps: window.__lastGpsCoords || null,
    };
    const list = loadCustomerHistory();
    list.unshift(entry);
    persistCustomerHistory(list);
  } catch (e) {
    console.warn('Could not save order to history:', e);
  }
}

function renderCustomerHistory() {
  const view = document.getElementById('view-history');
  if (!view) return;
  const list = loadCustomerHistory();
  if (!list.length) {
    view.innerHTML = `
      <button class="back" onclick="show('view-browse')">← Back</button>
      <h2 style="font-size: 24px; margin-bottom: 14px;">Your orders</h2>
      <div class="empty">
        <div class="em">📋</div>
        No orders yet.<br/>
        Your past orders will appear here.
      </div>
    `;
    return;
  }
  view.innerHTML = `
    <button class="back" onclick="show('view-browse')">← Back</button>
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
      <h2 style="font-size: 24px; margin: 0;">Your orders</h2>
      <button class="admin-btn" onclick="clearCustomerHistory()" title="Clear history">🗑️</button>
    </div>
    ${list.map(o => `
      <div class="order-history-card" onclick="toggleOrderExpand('${o.id}')">
        <div class="order-history-head">
          <div>
            <div class="order-history-id">${o.id}</div>
            <div class="order-history-date">${formatDateShort(o.date)}</div>
          </div>
          <div class="order-history-total">₹${o.total}</div>
        </div>
        <div class="order-history-shops">
          ${o.shops.map(s => `<span class="tag">${s.emoji} ${s.name}</span>`).join('')}
        </div>
        <div id="order-details-${o.id}" class="order-history-details" style="display: none;">
          ${o.shops.map(s => `
            <div style="margin-top: 10px;">
              <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">${s.emoji} ${s.name}</div>
              ${s.items.map(it => `
                <div class="order-history-line">
                  <span>${it.qty}× ${it.name}</span>
                  <span>₹${it.qty * it.price}</span>
                </div>
              `).join('')}
            </div>
          `).join('')}
          <div class="order-history-totals">
            <div class="order-history-line"><span>Subtotal</span><span>₹${o.subtotal}</span></div>
            <div class="order-history-line"><span>Delivery</span><span>₹${o.delivery}</span></div>
            <div class="order-history-line" style="font-weight: 700;"><span>Total</span><span>₹${o.total}</span></div>
          </div>
          <div class="order-history-footer">
            <div style="font-size: 12px; color: var(--ink-soft);">📍 ${o.address || '(no address)'}</div>
            ${o.transcript ? `<div style="font-size: 12px; color: var(--ink-soft); margin-top: 4px;">🎙️ "${o.transcript}"</div>` : ''}
          </div>
          <button class="primary" onclick="event.stopPropagation(); reorderFromHistory('${o.id}')" style="margin-top: 10px;">Reorder these items</button>
        </div>
      </div>
    `).join('')}
  `;
}

function toggleOrderExpand(id) {
  const el = document.getElementById('order-details-' + id);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function reorderFromHistory(orderId) {
  const order = loadCustomerHistory().find(o => o.id === orderId);
  if (!order) return;
  let addedCount = 0, missingCount = 0;
  order.shops.forEach(s => {
    const shop = shops.find(sh => sh.name === s.name);
    if (!shop) { missingCount += s.items.length; return; }
    s.items.forEach(it => {
      const item = shop.items.find(i => i.name === it.name && i.stock !== false);
      if (!item) { missingCount++; return; }
      if (!cart[item.id]) cart[item.id] = { item, qty: 0, shopId: shop.id };
      cart[item.id].qty += it.qty;
      addedCount++;
    });
  });
  updateCartBar();
  if (addedCount === 0) {
    alert('None of these items are currently available. The shop may have removed them.');
  } else if (missingCount > 0) {
    alert(`Added ${addedCount} item(s). ${missingCount} no longer available — removed from cart.`);
    show('view-checkout');
  } else {
    show('view-checkout');
  }
}

function clearCustomerHistory() {
  if (!confirm('Clear all order history from this device? This cannot be undone.')) return;
  localStorage.removeItem(CUSTOMER_HISTORY_KEY);
  renderCustomerHistory();
}

/* =====================================================================
   GLOBAL ITEM SEARCH — Home screen, live as you type
   ===================================================================== */

function searchItemsGlobal(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results = [];
  shops.forEach(shop => {
    if (!shop.items) return;
    shop.items.forEach(item => {
      if (!item.stock) return; // skip sold-out
      const hay = (item.name + ' ' + (item.desc || '')).toLowerCase();
      // Split query into words, all must match (AND)
      const words = q.split(/\s+/).filter(Boolean);
      const matches = words.every(w => hay.includes(w));
      if (matches) results.push({ item, shop });
    });
  });
  return results.slice(0, 30); // cap for perf
}

function renderSearchResults(query) {
  const panel = document.getElementById('searchResults');
  if (!panel) return;
  const q = query.trim();
  if (!q) {
    panel.style.display = 'none';
    panel.innerHTML = '';
    return;
  }
  const results = searchItemsGlobal(q);
  panel.style.display = 'block';
  if (!results.length) {
    panel.innerHTML = `
      <div class="search-results-header">Search results</div>
      <div class="empty" style="padding: 24px;">
        <div class="em">🔍</div>
        Nothing matches "${escapeHtml(q)}".<br/>
        Try different words or check the image upload option.
      </div>
    `;
    return;
  }
  panel.innerHTML = `
    <div class="search-results-header">${results.length} match${results.length === 1 ? '' : 'es'} across shops</div>
    ${results.map(r => {
      const inCart = cart[r.item.id]?.qty || 0;
      const imageHTML = r.item.image
        ? `<img src="${escapeHtml(r.item.image)}" alt="" onerror="this.parentElement.innerHTML='${r.item.emoji}';">`
        : r.item.emoji;
      return `
        <div class="search-result">
          <div class="item-emoji">${imageHTML}</div>
          <div class="item-body">
            <div class="item-name">${escapeHtml(r.item.name)}</div>
            <div class="item-desc">From ${escapeHtml(r.shop.name)} ${r.shop.emoji}</div>
            <div class="item-price">₹${r.item.price}</div>
          </div>
          <div>
            ${inCart > 0 ?
              `<div class="qty">
                 <button onclick="changeQty('${r.item.id}', '${r.shop.id}', -1); renderSearchResults(document.getElementById('homeSearch').value);">−</button>
                 <span>${inCart}</span>
                 <button onclick="changeQty('${r.item.id}', '${r.shop.id}', 1); renderSearchResults(document.getElementById('homeSearch').value);">+</button>
               </div>` :
              `<button class="add-btn" onclick="changeQty('${r.item.id}', '${r.shop.id}', 1); renderSearchResults(document.getElementById('homeSearch').value);">Add</button>`
            }
          </div>
        </div>
      `;
    }).join('')}
  `;
}

/* =====================================================================
   OCR — Image text recognition via Tesseract.js (lazy-loaded)
   User picks language per scan — keeps download size and accuracy sane.
   Supports: English, Kannada, Hindi, Tamil, Telugu, Malayalam, Marathi.
   ===================================================================== */

// Languages supported by the picker. Each language downloads its model
// on first use (~2–4 MB each). English is always paired in for mixed
// Indic-English text (product names, prices).
const OCR_LANGUAGES = [
  { code: 'eng',     label: 'English' },
  { code: 'kan+eng', label: 'Kannada + English' },
  { code: 'hin+eng', label: 'Hindi + English' },
  { code: 'tam+eng', label: 'Tamil + English' },
  { code: 'tel+eng', label: 'Telugu + English' },
  { code: 'mal+eng', label: 'Malayalam + English' },
  { code: 'mar+eng', label: 'Marathi + English' },
];

// Default language — change this line to flip the default
let ocrLanguage = localStorage.getItem('vyasaraghatta.ocrLang') || 'kan+eng';

function setOcrLanguage(code) {
  ocrLanguage = code;
  try { localStorage.setItem('vyasaraghatta.ocrLang', code); } catch (e) {}
  const label = OCR_LANGUAGES.find(l => l.code === code)?.label || code;
  const langBtn = document.getElementById('ocrLangBtn');
  if (langBtn) langBtn.textContent = `🌐 ${label.split(' +')[0]}`;
}

function openOcrLangPicker() {
  const current = ocrLanguage;
  const html = `
    <div class="modal-backdrop show" id="ocrLangModal" onclick="if(event.target===this)closeOcrLangPicker()">
      <div class="modal">
        <h3>OCR language</h3>
        <p style="font-size: 13px; color: var(--ink-soft); line-height: 1.5; margin-bottom: 10px;">
          Pick the language of text in your photo.
          Each language pack downloads once (~2–4 MB) and caches for later.
        </p>
        ${OCR_LANGUAGES.map(l => `
          <button class="lang-row ${l.code === current ? 'selected' : ''}" onclick="setOcrLanguage('${l.code}'); closeOcrLangPicker();">
            <span>${l.label}</span>
            ${l.code === current ? '<span style="color: var(--accent);">✓</span>' : ''}
          </button>
        `).join('')}
        <button class="secondary" style="margin-top: 10px;" onclick="closeOcrLangPicker()">Cancel</button>
      </div>
    </div>
  `;
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div.firstElementChild);
}

function closeOcrLangPicker() {
  const m = document.getElementById('ocrLangModal');
  if (m) m.remove();
}

let tesseractPromise = null;
function loadTesseract() {
  if (tesseractPromise) return tesseractPromise;
  tesseractPromise = new Promise((resolve, reject) => {
    if (window.Tesseract) { resolve(window.Tesseract); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';
    s.onload = () => resolve(window.Tesseract);
    s.onerror = () => reject(new Error('Could not load OCR engine. Check internet connection.'));
    document.head.appendChild(s);
  });
  return tesseractPromise;
}

async function handleOcrUpload(file) {
  if (!file) return;
  const status = document.getElementById('ocrStatus');
  const search = document.getElementById('homeSearch');
  const langLabel = OCR_LANGUAGES.find(l => l.code === ocrLanguage)?.label || ocrLanguage;
  status.style.display = 'block';
  status.className = 'ocr-status';
  status.innerHTML = `⏳ Loading image reader (${langLabel})…`;
  try {
    const Tesseract = await loadTesseract();
    status.innerHTML = `📸 Reading ${langLabel} text… (may take 5–20 seconds)`;
    const result = await Tesseract.recognize(file, ocrLanguage, {
      logger: (m) => {
        if (m.status === 'loading language traineddata' && m.progress) {
          status.innerHTML = `⬇️ Downloading ${langLabel} model… ${Math.round(m.progress * 100)}%`;
        } else if (m.status === 'recognizing text' && m.progress) {
          status.innerHTML = `📸 Reading… ${Math.round(m.progress * 100)}%`;
        }
      },
    });
    const rawText = (result.data.text || '').trim();
    if (!rawText) {
      status.className = 'ocr-status err';
      status.innerHTML = `⚠️ Couldn't find any ${langLabel.split(' +')[0]} text. Try a clearer photo or pick a different language with the 🌐 button.`;
      return;
    }

    // Match extracted text against catalogue
    const words = rawText.toLowerCase().split(/[^a-z0-9\u0900-\u097f\u0B80-\u0BFF\u0C00-\u0C7F\u0C80-\u0CFF\u0D00-\u0D7F]+/).filter(w => w.length >= 3);
    const matches = matchOcrToItems(words);
    if (!matches.length) {
      status.className = 'ocr-status err';
      status.innerHTML = `
        Found text but no matching items:<br/>
        <em style="font-size: 12px;">"${escapeHtml(rawText.slice(0, 140))}${rawText.length > 140 ? '…' : ''}"</em><br/>
        <button class="admin-btn" style="margin-top: 8px;" onclick="useOcrTextAsSearch('${escapeHtml(rawText).replace(/'/g,"\\'")}')">Search this text instead</button>
      `;
      return;
    }

    status.className = 'ocr-status ok';
    status.innerHTML = `✓ Found ${matches.length} matching item${matches.length === 1 ? '' : 's'} from ${langLabel} photo — showing below.`;

    const panel = document.getElementById('searchResults');
    const browse = document.getElementById('browseContent');
    if (browse) browse.style.display = 'none';
    if (search) search.value = '';
    renderOcrMatches(matches, rawText);
  } catch (err) {
    console.error('OCR failed:', err);
    status.className = 'ocr-status err';
    status.innerHTML = '✗ ' + (err.message || 'Could not read the image.');
  }
}

function matchOcrToItems(words) {
  const wordSet = new Set(words);
  const scored = [];
  shops.forEach(shop => {
    if (!shop.items) return;
    shop.items.forEach(item => {
      if (!item.stock) return;
      const itemWords = (item.name + ' ' + (item.desc || '')).toLowerCase().split(/\s+/);
      const itemWordSet = new Set(itemWords.filter(w => w.length >= 3));
      let score = 0;
      itemWordSet.forEach(iw => {
        if (wordSet.has(iw)) { score += 2; return; }
        // Fuzzy-ish: substring match in either direction
        for (const qw of wordSet) {
          if (qw.length >= 4 && (iw.includes(qw) || qw.includes(iw))) { score += 1; break; }
        }
      });
      if (score > 0) scored.push({ item, shop, score });
    });
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 30);
}

function renderOcrMatches(matches, rawText) {
  const panel = document.getElementById('searchResults');
  if (!panel) return;
  panel.style.display = 'block';
  panel.innerHTML = `
    <div class="search-results-header">📸 Matched from your photo</div>
    <details style="margin-bottom: 10px;">
      <summary style="font-size: 12px; color: var(--ink-soft); cursor: pointer;">View raw extracted text</summary>
      <div style="font-size: 12px; color: var(--ink-soft); padding: 8px; background: var(--paper-2); border-radius: 6px; margin-top: 4px; max-height: 120px; overflow-y: auto;">${escapeHtml(rawText)}</div>
    </details>
    ${matches.map(r => {
      const inCart = cart[r.item.id]?.qty || 0;
      const imageHTML = r.item.image
        ? `<img src="${escapeHtml(r.item.image)}" alt="" onerror="this.parentElement.innerHTML='${r.item.emoji}';">`
        : r.item.emoji;
      return `
        <div class="search-result">
          <div class="item-emoji">${imageHTML}</div>
          <div class="item-body">
            <div class="item-name">${escapeHtml(r.item.name)}</div>
            <div class="item-desc">From ${escapeHtml(r.shop.name)} ${r.shop.emoji}</div>
            <div class="item-price">₹${r.item.price}</div>
          </div>
          <div>
            ${inCart > 0 ?
              `<div class="qty">
                 <button onclick="changeQty('${r.item.id}', '${r.shop.id}', -1); renderOcrMatches(${JSON.stringify(matches).replace(/"/g,'&quot;')}, ${JSON.stringify(rawText).replace(/"/g,'&quot;')})">−</button>
                 <span>${inCart}</span>
                 <button onclick="changeQty('${r.item.id}', '${r.shop.id}', 1);">+</button>
               </div>` :
              `<button class="add-btn" onclick="changeQty('${r.item.id}', '${r.shop.id}', 1); this.outerHTML='<div class=\\'qty\\'><button onclick=\\'changeQty(&quot;${r.item.id}&quot;, &quot;${r.shop.id}&quot;, -1); updateCartBar();\\'>−</button><span>1</span><button onclick=\\'changeQty(&quot;${r.item.id}&quot;, &quot;${r.shop.id}&quot;, 1); updateCartBar();\\'>+</button></div>';">Add</button>`
            }
          </div>
        </div>
      `;
    }).join('')}
    <button class="secondary" onclick="clearOcr()" style="margin-top: 10px;">Done — back to browse</button>
  `;
}

function useOcrTextAsSearch(txt) {
  const search = document.getElementById('homeSearch');
  if (search) {
    search.value = txt.slice(0, 50);
    search.dispatchEvent(new Event('input'));
  }
}

function clearOcr() {
  const panel = document.getElementById('searchResults');
  const status = document.getElementById('ocrStatus');
  const browse = document.getElementById('browseContent');
  const search = document.getElementById('homeSearch');
  if (panel) { panel.style.display = 'none'; panel.innerHTML = ''; }
  if (status) { status.style.display = 'none'; status.innerHTML = ''; }
  if (browse) browse.style.display = '';
  if (search) search.value = '';
  // reset the file input so same file can be re-uploaded
  const file = document.getElementById('ocrFileInput');
  if (file) file.value = '';
}

/* =====================================================================
   SHOP EXPORT / IMPORT
   Admin exports shop (or all shops) as JSON. You publish JSON files
   to GitHub under /shops/<filename>.json, then the app fetches them
   on load and merges into the default catalog.
   ===================================================================== */

// ------- EXPORT (admin side) -------

function exportShop(shopId) {
  const shop = shops.find(s => s.id === shopId);
  if (!shop) return;
  const payload = {
    type: 'vyasaraghatta-shop-export',
    version: 1,
    exportedAt: new Date().toISOString(),
    shop: JSON.parse(JSON.stringify(shop)),  // deep clone
  };
  const filename = `shop-${slugify(shop.name)}.json`;
  downloadJson(filename, payload);
  showExportHelp(shop.name, filename);
}

function exportAllShops() {
  const payload = {
    type: 'vyasaraghatta-catalog-export',
    version: 1,
    exportedAt: new Date().toISOString(),
    shops: JSON.parse(JSON.stringify(shops)),
  };
  downloadJson('all-shops.json', payload);
  showExportHelp('all shops', 'all-shops.json');
}

function slugify(s) {
  return (s || 'shop')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

function downloadJson(filename, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function showExportHelp(name, filename) {
  const html = `
    <div class="modal-backdrop show" id="exportHelpModal" onclick="if(event.target===this)closeExportHelp()">
      <div class="modal">
        <h3>Shop exported ✓</h3>
        <p style="font-size: 14px; color: var(--ink-soft); line-height: 1.5;">
          Downloaded <strong>${escapeHtml(filename)}</strong> to your phone.
        </p>
        <p style="font-size: 14px; color: var(--ink-soft); line-height: 1.5;">
          To make customers see this:
        </p>
        <ol style="font-size: 13px; line-height: 1.6; padding-left: 20px; color: var(--ink);">
          <li>Send the JSON file to the admin (Sunil) on WhatsApp or email.</li>
          <li>Admin uploads it to the GitHub repo under the <code>shops/</code> folder.</li>
          <li>Admin updates <code>shops/index.json</code> to list the new file.</li>
          <li>All customers will see the latest data when their app next refreshes.</li>
        </ol>
        <p style="font-size: 12px; color: var(--ink-soft); margin-top: 10px; padding: 8px; background: var(--paper-2); border-radius: 6px;">
          💡 <strong>Tip:</strong> for urgent updates, send the JSON on WhatsApp with a note. Admin can push it in minutes.
        </p>
        <button class="primary" onclick="closeExportHelp()">OK</button>
      </div>
    </div>
  `;
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div.firstElementChild);
}

function closeExportHelp() {
  const m = document.getElementById('exportHelpModal');
  if (m) m.remove();
}

// ------- IMPORT (customer side) -------

// The app can auto-fetch the published catalog from GitHub.
// Uses relative path so it works on GitHub Pages under any subdirectory.
// Admin publishes /shops/index.json with list of shop JSON filenames.
const REMOTE_INDEX_URL = './shops/index.json';

async function syncRemoteShops() {
  // Respect local edits: if user has hand-edited shops (via admin),
  // we don't overwrite unless user explicitly syncs.
  const hasLocalEdits = !!localStorage.getItem(STORAGE_KEY);
  try {
    const idxRes = await fetch(REMOTE_INDEX_URL, { cache: 'no-cache' });
    if (!idxRes.ok) return { ok: false, reason: 'no-index' };
    const idx = await idxRes.json();
    if (!idx || !Array.isArray(idx.files)) return { ok: false, reason: 'bad-index' };

    const fetched = [];
    for (const file of idx.files) {
      try {
        const res = await fetch(`./shops/${file}`, { cache: 'no-cache' });
        if (!res.ok) continue;
        const data = await res.json();
        if (data.shop) fetched.push(data.shop);
        else if (Array.isArray(data.shops)) fetched.push(...data.shops);
      } catch (e) {
        console.warn('Could not fetch', file, e);
      }
    }
    if (!fetched.length) return { ok: false, reason: 'no-shops' };

    // Merge: remote shops override by id; new ones are added.
    const byId = new Map(shops.map(s => [s.id, s]));
    fetched.forEach(s => byId.set(s.id, s));
    const merged = Array.from(byId.values());

    // Only auto-apply if user hasn't manually edited locally
    if (!hasLocalEdits) {
      shops.length = 0;
      merged.forEach(s => shops.push(s));
      renderShops();
      console.log(`[Vyasaraghatta] Synced ${fetched.length} shop(s) from remote.`);
    } else {
      // Stash for manual apply via "Pull latest shops"
      window.__remoteShopsPending = merged;
      console.log(`[Vyasaraghatta] Remote sync available. Use "Pull latest" in admin.`);
    }
    return { ok: true, count: fetched.length, pending: hasLocalEdits };
  } catch (e) {
    console.warn('Remote shop sync failed:', e);
    return { ok: false, reason: 'error', error: e.message };
  }
}

function applyPendingRemoteShops() {
  if (!window.__remoteShopsPending) { alert('No remote updates pending.'); return; }
  if (!confirm('Replace your local edits with the latest remote shop data? Your local changes will be lost.')) return;
  shops.length = 0;
  window.__remoteShopsPending.forEach(s => shops.push(s));
  saveShops();
  window.__remoteShopsPending = null;
  renderShops();
  renderShopAdmin();
  alert('✓ Latest shops pulled.');
}

// Fire sync on startup (non-blocking)
setTimeout(() => { syncRemoteShops(); }, 500);

/* =====================================================================
   FULFILMENT MODE — pickup vs delivery
   ===================================================================== */

let fulfilmentMode = 'delivery'; // 'delivery' | 'pickup'

function setFulfilmentMode(mode) {
  fulfilmentMode = mode;
  document.getElementById('modeDelivery').classList.toggle('active', mode === 'delivery');
  document.getElementById('modePickup').classList.toggle('active', mode === 'pickup');

  // Hide delivery address field for pickup
  const addrField = document.getElementById('addrField');
  if (addrField) addrField.style.display = mode === 'pickup' ? 'none' : '';

  // Warn about multi-shop pickup
  const warning = document.getElementById('pickupWarning');
  const shopIds = Object.keys(cartGroupedByShop());
  if (mode === 'pickup' && shopIds.length > 1) {
    warning.className = 'ocr-status';
    warning.style.display = 'block';
    warning.innerHTML = `⚠️ Your basket has items from <strong>${shopIds.length} shops</strong>. For pickup, you'll need to visit each shop yourself. Consider switching to delivery, or remove items from shops you won't visit.`;
  } else if (mode === 'pickup') {
    warning.style.display = 'none';
  } else {
    warning.style.display = 'none';
  }

  // Recalc cart: pickup means no delivery fee
  renderCartSummary();
}

/* =====================================================================
   SHOP CONFIRM LINK (B2 flow)
   Each shop gets a unique link in the WhatsApp message. When the shop
   taps it, a page loads that lets them reply "READY" on WhatsApp to
   the customer, with a pre-filled message. No backend required.
   ===================================================================== */

function buildConfirmLink(orderId, shopId, shopName, customerPhone, customerName, items, total, mode) {
  // Encode minimal order data into URL hash fragment.
  // Hash fragment (#...) doesn't hit the server, stays client-side only.
  const payload = {
    o: orderId,
    s: shopId,
    sn: shopName,
    cp: customerPhone,
    cn: customerName || '',
    i: items,        // [{n: name, q: qty}]
    t: total,
    m: mode,         // 'delivery' or 'pickup'
  };
  const base = location.origin + location.pathname.replace(/\/[^\/]*$/, '/');
  const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
  return `${base}#confirm=${encoded}`;
}

function parseConfirmHash() {
  const m = location.hash.match(/^#confirm=(.+)$/);
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(atob(m[1])));
  } catch (e) {
    console.warn('Bad confirm link:', e);
    return null;
  }
}

function showShopConfirmPage(data) {
  const view = document.getElementById('view-confirm-shop');
  if (!view) return;
  const itemsHtml = data.i.map(it => `<li>${it.q}× ${escapeHtml(it.n)}</li>`).join('');
  const modeLabel = data.m === 'pickup' ? '🚶 Customer will pick up' : '🏍️ Needs delivery (rider will come)';
  view.innerHTML = `
    <div style="padding: 10px 4px;">
      <div style="font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); font-weight: 600; margin-bottom: 4px;">Vyasaraghatta</div>
      <h2 style="font-size: 24px; margin: 0 0 4px;">Order for ${escapeHtml(data.sn || 'your shop')}</h2>
      <p style="color: var(--ink-soft); font-size: 14px; margin: 0 0 14px;">Order #${escapeHtml(data.o)}</p>
    </div>
    <div class="panel">
      <div class="voice-label">Items to prepare</div>
      <ul style="padding-left: 20px; margin: 8px 0; line-height: 1.6;">${itemsHtml}</ul>
      <div style="display:flex; justify-content:space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--rule);">
        <span>Total</span>
        <strong>₹${data.t}</strong>
      </div>
    </div>
    <div class="panel" style="background: var(--paper-2);">
      <div style="font-size: 15px; font-weight: 600;">${modeLabel}</div>
      <div style="font-size: 13px; color: var(--ink-soft); margin-top: 4px;">
        Customer: ${escapeHtml(data.cn || 'Anonymous')} · 📞 ${escapeHtml(data.cp)}
      </div>
    </div>
    <div class="panel">
      <div class="voice-label">Ready to go?</div>
      <div class="voice-sub">
        Tap below to message the customer that their order is ready.
        ${data.m === 'delivery' ? 'Then wait for the rider to arrive.' : 'They will come and collect it.'}
      </div>
      <button class="primary" onclick="shopSendReady('${escapeHtml(data.o)}', '${escapeHtml(data.sn)}', '${escapeHtml(data.cp)}', '${data.m}')" style="margin-top: 10px;">
        ✓ Tell customer it's ready
      </button>
      <button class="secondary" onclick="shopSendDelay('${escapeHtml(data.o)}', '${escapeHtml(data.sn)}', '${escapeHtml(data.cp)}')" style="margin-top: 8px;">
        Need more time
      </button>
      <button class="secondary" onclick="shopSendUnavailable('${escapeHtml(data.o)}', '${escapeHtml(data.sn)}', '${escapeHtml(data.cp)}')" style="margin-top: 8px; background: #fee2e2; color: var(--accent-2);">
        Can't fulfil this order
      </button>
    </div>
  `;
  show('view-confirm-shop');
}

function shopSendReady(orderId, shopName, custPhone, mode) {
  const modeMsg = mode === 'pickup'
    ? 'You can come and collect it now.'
    : 'The rider will arrive shortly for pickup.';
  const msg = `✅ *${shopName}* — Order #${orderId} is *READY*.\n\n${modeMsg}\n\n— Replied via Vyasaraghatta`;
  openWhatsAppTo(custPhone, msg);
}

function shopSendDelay(orderId, shopName, custPhone) {
  const msg = `⏳ *${shopName}* — Order #${orderId} needs about 10 more minutes. Sorry for the wait.\n\n— Replied via Vyasaraghatta`;
  openWhatsAppTo(custPhone, msg);
}

function shopSendUnavailable(orderId, shopName, custPhone) {
  if (!confirm('Send "cannot fulfil" message to customer?')) return;
  const msg = `❌ *${shopName}* — We can't fulfil Order #${orderId} right now. Please try another shop or contact us on WhatsApp to discuss. Sorry!\n\n— Replied via Vyasaraghatta`;
  openWhatsAppTo(custPhone, msg);
}

function openWhatsAppTo(phone, msg) {
  // Strip non-digits; default to India country code if missing
  let num = (phone || '').replace(/\D/g, '');
  if (num.length === 10) num = '91' + num;
  const url = num
    ? `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
    : `https://wa.me/?text=${encodeURIComponent(msg)}`;
  const a = document.createElement('a');
  a.href = url; a.target = '_blank'; a.rel = 'noopener';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

// Auto-detect confirm link on app load
function checkForConfirmLink() {
  const data = parseConfirmHash();
  if (data && data.o) {
    showShopConfirmPage(data);
  }
}

// Run after a moment (other startup code finishes first)
setTimeout(checkForConfirmLink, 200);
