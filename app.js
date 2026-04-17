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

document.querySelectorAll('.role-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.role-switch button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const role = btn.dataset.role;
    ['navCustomer','navShop','navRider'].forEach(n => document.getElementById(n).style.display = 'none');
    document.getElementById('fabAdd').style.display = 'none';
    if (role === 'customer') {
      document.getElementById('navCustomer').style.display = 'flex';
      show('view-browse');
    } else if (role === 'shop') {
      document.getElementById('navShop').style.display = 'flex';
      cart = {}; updateCartBar();
      show('view-dash'); dashTab(activeTab);
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
    return `
      <div class="item ${outClass}">
        <div class="item-emoji">${it.emoji}</div>
        <div class="item-body">
          <div class="item-name">${it.name} ${!it.stock ? '<span class="out-tag">· sold out</span>' : ''}</div>
          <div class="item-desc">${it.desc}</div>
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
  document.getElementById('fabAdd').style.display    = tab === 'menu'   ? 'grid' : 'none';
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
  const list = document.getElementById('menuList');
  list.innerHTML = dashMenu.map(m => `
    <div class="inv-item">
      <div class="item-emoji">${m.emoji}</div>
      <div class="n"><div class="n-name">${m.name}</div><div class="n-meta">₹${m.price} · ${m.sold} sold today</div></div>
      <button class="toggle ${m.stock ? 'on' : ''}" onclick="toggleStock('${m.id}')"></button>
    </div>`).join('');
}

function toggleStock(id) {
  const m = dashMenu.find(x => x.id === id);
  if (m) { m.stock = !m.stock; renderMenu(); }
}

function openAddModal() {
  document.getElementById('addModal').classList.add('show');
  document.getElementById('newName').value = '';
  document.getElementById('newPrice').value = '';
  document.getElementById('newDesc').value = '';
  selectedEmoji = '🍞';
  document.querySelectorAll('#emojiPick button').forEach((b,i) => b.classList.toggle('selected', i===0));
}
function closeAddModal() { document.getElementById('addModal').classList.remove('show'); }
document.getElementById('emojiPick').addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    document.querySelectorAll('#emojiPick button').forEach(b => b.classList.remove('selected'));
    e.target.classList.add('selected');
    selectedEmoji = e.target.dataset.e;
  }
});
function saveNewItem() {
  const name  = document.getElementById('newName').value.trim();
  const price = parseInt(document.getElementById('newPrice').value, 10);
  const desc  = document.getElementById('newDesc').value.trim();
  if (!name || !price) { alert('Please add at least a name and price.'); return; }
  dashMenu.unshift({ id: 'new' + Date.now(), emoji: selectedEmoji, name, price, stock: true, sold: 0 });
  closeAddModal();
  renderMenu();
}

renderShops();

/* =====================================================================
   VERSION & UPDATE MANAGEMENT
   ===================================================================== */

// Single source of truth — bump this on every release (also bump CACHE_VERSION in sw.js)
const APP_VERSION = '0.3.0';
const RELEASE_NOTES = [
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
