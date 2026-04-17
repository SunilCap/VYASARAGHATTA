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
  if (id === 'view-checkout') renderCartSummary();
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

document.getElementById('searchInput').addEventListener('input', e => {
  searchQ = e.target.value.trim().toLowerCase();
  renderShops();
});

function openShop(id) {
  currentShop = shops.find(s => s.id === id);
  document.getElementById('shopName').textContent = currentShop.name;
  document.getElementById('shopMeta').innerHTML =
    [catLabel(currentShop.category), ...currentShop.meta]
      .map((m,i) => i===0 ? m : `<span class="dot">·</span>${m}`).join('');
  renderItems();
  lastView = 'view-shop';
  show('view-shop');
}

function renderItems() {
  const list = document.getElementById('itemList');
  list.innerHTML = currentShop.items.map(it => {
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
  if (currentShop && currentShop.id === shopId) renderItems();
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
  Object.keys(groups).forEach((sid, idx) => {
    const shop = shops.find(s => s.id === sid);
    delivery += idx === 0 ? shop.fee : Math.round(shop.fee / 2);
  });
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
const APP_VERSION = '0.4.2';
const RELEASE_NOTES = [
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
  list.innerHTML = `
    <button class="primary" onclick="openShopEditor()" style="margin-bottom: 10px;">+ Add new shop</button>
    <button class="secondary" onclick="resetShopsToDefault()" style="margin-bottom: 14px; font-size: 13px;">Reset to demo shops</button>
    <div class="admin-hint">Tap a shop to manage its items.</div>
    ${shops.map(s => `
      <div class="admin-row" onclick="openShopItems('${s.id}')">
        <div class="admin-emoji">${s.emoji}</div>
        <div class="admin-info">
          <div class="admin-name">${s.name}</div>
          <div class="admin-meta">${catLabel(s.category)} · ${s.items.length} items</div>
        </div>
        <div class="admin-actions" onclick="event.stopPropagation();">
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

    // Pick a MIME type the browser actually supports.
    // iOS Safari supports audio/mp4; Chrome/Android supports audio/webm.
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/mpeg',
      'audio/ogg;codecs=opus',
      ''  // let the browser pick
    ];
    let chosenMime = '';
    for (const m of candidates) {
      if (!m || (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(m))) {
        chosenMime = m;
        break;
      }
    }
    mediaRecorder = chosenMime
      ? new MediaRecorder(stream, { mimeType: chosenMime })
      : new MediaRecorder(stream);

    mediaRecorder.addEventListener('dataavailable', e => {
      if (e.data.size > 0) audioChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const useMime = chosenMime || 'audio/webm';
      audioBlob = new Blob(audioChunks, { type: useMime });
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
  const addr = document.getElementById('addr').value.trim() || '(not provided)';
  const phone = document.getElementById('phone').value.trim() || '(not provided)';

  let msg = `🧺 *New Vyasaraghatta Order*\n\n`;
  shopIds.forEach(sid => {
    const shop = shops.find(s => s.id === sid);
    const lines = groups[sid];
    msg += `*${shop.name}* ${shop.emoji}\n`;
    lines.forEach(l => {
      msg += `  • ${l.qty}× ${l.item.name} — ₹${l.qty * l.item.price}\n`;
    });
    msg += `\n`;
  });
  msg += `_Subtotal: ₹${subtotal}_\n`;
  msg += `_Delivery: ₹${delivery}_\n`;
  msg += `*Total: ₹${total}*\n\n`;
  msg += `📍 Deliver to: ${addr}\n`;
  msg += `📞 Contact: ${phone}\n`;
  if (voiceTranscript) {
    msg += `\n🎙️ *Voice note transcript:*\n"${voiceTranscript}"\n`;
  }
  if (audioBlob) {
    msg += `\n_(Customer has a voice note — will send separately.)_\n`;
  }
  msg += `\n— Sent via Vyasaraghatta`;
  return msg;
}

function sendViaWhatsApp() {
  if (Object.keys(cart).length === 0) { alert('Your basket is empty.'); return; }
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

async function sendViaShareSheet() {
  if (Object.keys(cart).length === 0) { alert('Your basket is empty.'); return; }
  const msg = buildOrderMessage();
  if (navigator.share) {
    try {
      const shareData = { title: 'Vyasaraghatta order', text: msg };
      // Try to attach audio file if the browser supports it
      if (audioBlob && navigator.canShare) {
        const file = new File([audioBlob], 'voice-note.webm', { type: 'audio/webm' });
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
  // Offer to download audio if present (so user can forward it manually)
  if (audioBlob) {
    const confirmed = confirm('Order text has been sent. Would you like to save your voice note to forward separately?');
    if (confirmed) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `voice-order-${Date.now()}.webm`;
      a.click();
    }
  }
  cart = {};
  clearVoiceRecording();
  updateCartBar();
  show('view-browse');
  setTimeout(() => alert('Order shared! The shop or your contact will confirm.'), 300);
}
