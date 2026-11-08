/* Grade 10 · Week 10 · Session 2 · practical missions: School Store & Clubs */
window.LAB_OPTS = {
  welcome: ['Welcome to the School Store & Clubs lab! 🛒🧺 Real Python with dictionaries and sets.', 'Start with:  prices = {"pen": 3, "book": 25, "bag": 60}'],
  chips: ['{ }', '[ ]', ':', '" "', ' in ', '+=', '.add()', '.items()', '.split()', ' | ', ' & ', ' - ', 'len()', 'set()', 'sorted()', 'print()'],
  doneText: '🎉 Store open and clubs sorted! Try your own: a menu with prices, or sets of your friends’ hobbies.',
  missions: [
    { id: 'store', t: 'Open the store: a dictionary of 3+ items with their prices (numbers)', hint: 'prices = {"pen": 3, "book": 25, "bag": 60}', demo: ['prices = {"pen": 3, "book": 25, "bag": 60}'],
      check: (c) => c.V.some((v) => c.isObj(v) && v.t === 'dict' && v.m.size >= 3 && [...v.m.values()].every((p) => typeof p[1] === 'number')) },
    { id: 'edit', t: 'Add a NEW item, then change the price of an item you already sell', hint: 'prices["ruler"] = 5; prices["bag"] = 55', demo: ['prices["ruler"] = 5', 'prices["bag"] = 55', 'prices'],
      check: (c) => c.flags.newkey && c.flags.updkey },
    { id: 'stock', t: 'Check if the store sells an item with the in operator', hint: '"pen" in prices', demo: ['"pen" in prices', '"laptop" in prices'],
      check: (c) => c.flags.in_dict },
    { id: 'cart', t: 'Add up a cart: loop over the cart and += each price into total', hint: 'cart = ["pen", "book", "pen"]; total = 0; for item in cart: total += prices[item]', demo: ['cart = ["pen", "book", "pen"]', 'total = 0', 'for item in cart: total += prices[item]', 'print("Total:", total, "SAR")'],
      check: (c) => c.flags.loop && c.flags.lookup && typeof c.vars.get('total') === 'number' && c.vars.get('total') > 0 },
    { id: 'clubs', t: 'Clubs: who is in BOTH clubs (&) and who is in EITHER (|)?', hint: 'chess = {"Ali", "Sara", "Omar"}; robotics = {"Sara", "Huda"}; chess & robotics', demo: ['chess = {"Ali", "Sara", "Omar", "Maha"}', 'robotics = {"Sara", "Huda", "Omar"}', 'chess & robotics', 'chess | robotics'],
      check: (c) => c.flags.ops && c.flags.ops.has('&') && c.flags.ops.has('|') },
    { id: 'words', t: 'Count the UNIQUE words in a sentence with set()', hint: 'words = "the cat and the hat and the bat".split(); len(set(words))', demo: ['words = "the cat and the hat and the bat".split()', 'len(words)', 'len(set(words))'],
      check: (c) => c.flags.dupdrop },
    { id: 'login', t: 'Login check: look up a password by username and compare it with ==', hint: 'users = {"huda": "Pa55", "amir": "S3cret"}; users["huda"] == "Pa55"', demo: ['users = {"huda": "Pa55", "amir": "S3cret"}', 'users["huda"] == "Pa55"', 'users["amir"] == "guess"'],
      check: (c) => c.flags.eqtrue && c.flags.lookup && c.V.some((v) => c.isObj(v) && v.t === 'dict' && [...v.m.values()].every((p) => typeof p[1] === 'string')) },
  ],
};

/* Python Dict & Set Lab · Grade 10 · Week 10 · Session 1
   A small, safe Python interpreter for dictionaries, sets, lists and tuples, with missions and live checks.
   Usage: const lab = mountLab(root, { fs: '18px', height: '640px', onChange() {} })
          lab.tasks() -> [[label, done], ...]   lab.demoStep() -> bool   lab.demo()   lab.reset() */
(function () {
  const CSS = `
.pl{--ink:#1B1F3B;font-size:var(--plfs,18px);font-family:Nunito,system-ui,sans-serif;color:var(--ink);display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);gap:.8em;height:var(--plh,640px)}
.pl *{box-sizing:border-box}
.pl-next{grid-column:1/-1;display:flex;align-items:center;gap:.8em;background:linear-gradient(90deg,#fff2c4,#fff7e0);border:3px solid #FFB020;border-radius:1em;padding:.55em .9em;font-weight:800}
.pl-next .tag{background:#FFB020;color:#fff;border-radius:.6em;padding:.25em .6em;font:900 .8em Nunito;letter-spacing:.1em;flex:none}
.pl-next .txt{flex:1;min-width:0;line-height:1.3}
.pl-next code,.pl-mis code{font-family:'JetBrains Mono',monospace;background:rgba(255,255,255,.7);padding:.05em .3em;border-radius:.3em;font-size:.92em}
.pl-btn{border:0;border-radius:.7em;padding:.5em .85em;font:800 .9em Nunito;cursor:pointer;background:#5B5BF0;color:#fff;box-shadow:0 .2em 0 #3b3bc0;white-space:nowrap}
.pl-btn.g{background:#12B886;box-shadow:0 .2em 0 #0b8a62}.pl-btn.w{background:#fff;color:var(--ink);box-shadow:0 .2em 0 #dfe3f2}
.pl-term{background:#151936;border-radius:1em;display:flex;flex-direction:column;min-height:0;box-shadow:0 .35em 0 #0b0e22;overflow:hidden}
.pl-bar{display:flex;align-items:center;gap:.45em;padding:.5em .8em;background:#1f2447;color:#9aa3d6;font:700 .8em Nunito}
.pl-bar i{width:.75em;height:.75em;border-radius:50%;display:inline-block}
.pl-out{flex:1;overflow:auto;padding:.6em .9em;font:500 .95em/1.5 'JetBrains Mono',monospace;color:#e9ecff;white-space:pre-wrap;word-break:break-word}
.pl-out .in{color:#9aa3d6}.pl-out .in b{color:#7ee2b8;font-weight:700}
.pl-out .err{color:#ff8a9a}.pl-out .ok{color:#ffd27a}.pl-out .info{color:#7cc8ff;font-family:Nunito;font-weight:800}
.pl-row{display:flex;align-items:center;gap:.5em;padding:.5em .7em;background:#1f2447}
.pl-row span{color:#7ee2b8;font:700 1em 'JetBrains Mono'}
.pl-row input{flex:1;min-width:0;background:#0f1330;border:2px solid #343a6b;border-radius:.6em;color:#fff;font:600 1em 'JetBrains Mono';padding:.45em .6em;outline:none}
.pl-row input:focus{border-color:#7ee2b8}
.pl-chips{display:flex;flex-wrap:wrap;gap:.35em;padding:0 .7em .6em;background:#1f2447}
.pl-chips button{border:0;border-radius:.5em;padding:.25em .55em;background:#2d3366;color:#cfd4ff;font:700 .8em 'JetBrains Mono';cursor:pointer}
.pl-side{display:flex;flex-direction:column;gap:.7em;min-height:0}
.pl-vars{flex:1;min-height:0;overflow:auto;background:#fff;border-radius:1em;padding:.7em .8em;box-shadow:0 .3em 0 #e4e1f5}
.pl-h{font:900 .75em Nunito;letter-spacing:.14em;text-transform:uppercase;color:#5B5BF0;margin-bottom:.4em}
.pl-empty{color:#9aa0c4;font-weight:800;padding:.6em 0}
.pl-v{border:3px solid #eef0fb;border-radius:.8em;padding:.45em .6em;margin-bottom:.5em}
.pl-v.flash{animation:plf .9s}
@keyframes plf{0%{border-color:#FFB020;background:#fff7e0}100%{border-color:#eef0fb;background:#fff}}
.pl-v .nm{display:flex;align-items:center;gap:.5em;font:800 1em 'JetBrains Mono'}
.pl-v .ty{font:900 .7em Nunito;letter-spacing:.08em;text-transform:uppercase;color:#fff;border-radius:.5em;padding:.15em .5em}
.pl-v .bd{display:flex;flex-wrap:wrap;gap:.3em;margin-top:.35em;align-items:center}
.pl-kv{display:inline-flex;border-radius:.5em;overflow:hidden;font:700 .82em 'JetBrains Mono'}
.pl-kv b{background:#5B5BF0;color:#fff;padding:.2em .45em;font-weight:700}.pl-kv i{font-style:normal;background:#e8fbf3;color:#0b6a4a;padding:.2em .45em}
.pl-el{font:700 .82em 'JetBrains Mono';padding:.2em .5em;border-radius:999px;background:#ffe8ec;color:#c0264a}
.pl-li{font:700 .82em 'JetBrains Mono';padding:.2em .45em;border-radius:.4em;background:#e3f3ff;color:#0d5ea8}
.pl-li sub{color:#7a86b8;font-size:.75em;margin-left:.2em}
.pl-mis{background:#fff;border-radius:1em;padding:.6em .8em;box-shadow:0 .3em 0 #e4e1f5;max-height:48%;overflow:auto}
.pl-m{display:flex;gap:.5em;align-items:flex-start;padding:.3em 0;border-top:2px solid #f2f3fa;font:700 .85em/1.3 Nunito;color:#4a5078}
.pl-m:first-of-type{border-top:0}
.pl-m .ck{flex:none;width:1.4em;height:1.4em;border-radius:.4em;background:#e7e9f5;color:#fff;display:grid;place-items:center;font-size:.85em;margin-top:.05em}
.pl-m.on{color:#12884f}.pl-m.on .ck{background:#16a34a}
.pl-m.cur{color:var(--ink)}.pl-m.cur .ck{background:#FFB020}
.pl-m .sm{border:0;background:#EEF0FF;color:#3730a3;border-radius:.5em;font:800 .78em Nunito;padding:.15em .45em;cursor:pointer;margin-left:auto;flex:none}
@media (max-width:900px){.pl{grid-template-columns:minmax(0,1fr);height:auto}.pl-next{flex-wrap:wrap}.pl-out{max-height:22em}.pl-vars{max-height:18em}.pl-mis{max-height:none}}
`;
  // ---------- errors ----------
  class PyErr extends Error { constructor(type, msg) { super(msg); this.type = type; } }
  const E = (t, m) => new PyErr(t, m);
  // ---------- values ----------
  const isObj = (v) => v && typeof v === 'object';
  const tname = (v) => v === null ? 'NoneType' : typeof v === 'boolean' ? 'bool' : typeof v === 'number' ? (Number.isInteger(v) ? 'int' : 'float') : typeof v === 'string' ? 'str' : v.t === 'fn' ? 'builtin_function_or_method' : v.t === 'view' ? v.kind : v.t === 'mod' ? 'module' : v.t;
  const hash = (v) => {
    if (v === null) return 'N'; if (typeof v === 'boolean') return 'n' + (v ? 1 : 0); if (typeof v === 'number') return 'n' + v; if (typeof v === 'string') return 's' + v;
    if (v.t === 'tuple') return 't(' + v.a.map(hash).join(',') + ')';
    throw E('TypeError', `unhashable type: '${tname(v)}'`);
  };
  const mkList = (a) => ({ t: 'list', a }), mkTuple = (a) => ({ t: 'tuple', a });
  const mkSet = (items) => { const m = new Map(); items.forEach((x) => { const k = hash(x); if (!m.has(k)) m.set(k, x); }); return { t: 'set', m }; };
  const mkDict = (pairs) => { const m = new Map(); pairs.forEach(([k, v]) => { const h = hash(k); if (m.has(h)) m.get(h)[1] = v; else m.set(h, [k, v]); }); return { t: 'dict', m }; };
  const qstr = (s) => { const q = s.includes("'") && !s.includes('"') ? '"' : "'"; return q + s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(new RegExp(q, 'g'), '\\' + q) + q; };
  const numStr = (n) => Number.isFinite(n) ? (Number.isInteger(n) ? String(n) : String(+n.toPrecision(15))) : (n > 0 ? 'inf' : n < 0 ? '-inf' : 'nan');
  const setOrder = (vals) => vals.every((x) => typeof x === 'number' && Number.isInteger(x) && x >= 0 && x < 1e6) ? [...vals].sort((a, b) => a - b) : vals;
  function repr(v) {
    if (v === null) return 'None'; if (v === true) return 'True'; if (v === false) return 'False';
    if (typeof v === 'number') return numStr(v); if (typeof v === 'string') return qstr(v);
    switch (v.t) {
      case 'list': return '[' + v.a.map(repr).join(', ') + ']';
      case 'tuple': return v.a.length === 1 ? '(' + repr(v.a[0]) + ',)' : '(' + v.a.map(repr).join(', ') + ')';
      case 'set': return v.m.size ? '{' + setOrder([...v.m.values()]).map(repr).join(', ') + '}' : 'set()';
      case 'dict': return '{' + [...v.m.values()].map(([k, x]) => repr(k) + ': ' + repr(x)).join(', ') + '}';
      case 'view': return v.kind + '([' + v.a.map(repr).join(', ') + '])';
      case 'type': return `<class '${v.name}'>`;
      case 'fn': return `<built-in function ${v.name}>`;
      case 'mod': return `<module '${v.name}'>`;
    } return String(v);
  }
  const str = (v) => typeof v === 'string' ? v : repr(v);
  const truthy = (v) => v === null ? false : typeof v === 'boolean' ? v : typeof v === 'number' ? v !== 0 : typeof v === 'string' ? v.length > 0 : v.t === 'list' || v.t === 'tuple' || v.t === 'view' ? v.a.length > 0 : v.t === 'set' || v.t === 'dict' ? v.m.size > 0 : true;
  function iter(v) {
    if (typeof v === 'string') return [...v];
    if (isObj(v)) { if (v.t === 'list' || v.t === 'tuple' || v.t === 'view') return v.a.slice(); if (v.t === 'set') return [...v.m.values()]; if (v.t === 'dict') return [...v.m.values()].map((p) => p[0]); }
    throw E('TypeError', `'${tname(v)}' object is not iterable`);
  }
  function eq(a, b) {
    if (isObj(a) && isObj(b)) {
      if ((a.t === 'list' && b.t === 'list') || (a.t === 'tuple' && b.t === 'tuple')) return a.a.length === b.a.length && a.a.every((x, i) => eq(x, b.a[i]));
      if (a.t === 'set' && b.t === 'set') return a.m.size === b.m.size && [...a.m.keys()].every((k) => b.m.has(k));
      if (a.t === 'dict' && b.t === 'dict') return a.m.size === b.m.size && [...a.m.entries()].every(([k, [, v]]) => b.m.has(k) && eq(v, b.m.get(k)[1]));
      return a === b;
    }
    if (typeof a === 'boolean') a = +a; if (typeof b === 'boolean') b = +b;
    return a === b;
  }
  const lenOf = (v) => { if (typeof v === 'string') return v.length; if (isObj(v)) { if (v.t === 'list' || v.t === 'tuple' || v.t === 'view') return v.a.length; if (v.t === 'set' || v.t === 'dict') return v.m.size; } throw E('TypeError', `object of type '${tname(v)}' has no len()`); };
  const cmpv = (a, b) => { const na = typeof a === 'number' || typeof a === 'boolean', nb = typeof b === 'number' || typeof b === 'boolean'; if (na && nb) return (+a) - (+b); if (typeof a === 'string' && typeof b === 'string') return a < b ? -1 : a > b ? 1 : 0; throw E('TypeError', `'<' not supported between instances of '${tname(a)}' and '${tname(b)}'`); };
  // ---------- tokenizer ----------
  function tokenize(src) {
    const T = []; let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (c === ' ' || c === '\t') { i++; continue; }
      if (c === '#') break;
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(src[i + 1] || ''))) { let j = i; while (j < src.length && /[0-9._]/.test(src[j])) j++; T.push({ t: 'num', v: parseFloat(src.slice(i, j).replace(/_/g, '')) }); i = j; continue; }
      if (c === '"' || c === "'") { let j = i + 1, s = ''; while (j < src.length && src[j] !== c) { if (src[j] === '\\' && j + 1 < src.length) { const n = src[j + 1]; s += n === 'n' ? '\n' : n === 't' ? '\t' : n; j += 2; continue; } s += src[j++]; } if (j >= src.length) throw E('SyntaxError', 'unterminated string literal'); T.push({ t: 'str', v: s }); i = j + 1; continue; }
      if (/[A-Za-z_]/.test(c)) { let j = i; while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++; T.push({ t: 'name', v: src.slice(i, j) }); i = j; continue; }
      const two = src.slice(i, i + 2);
      if (['==', '!=', '<=', '>=', '//', '**', '+=', '-=', '|=', '&='].includes(two)) { T.push({ t: 'op', v: two }); i += 2; continue; }
      if ('()[]{},:.=<>+-*/%|&^~'.includes(c)) { T.push({ t: 'op', v: c }); i++; continue; }
      if ('“”‘’'.includes(c)) throw E('SyntaxError', `invalid character '${c}': use straight quotes " or '`);
      throw E('SyntaxError', `invalid character '${c}'`);
    }
    T.push({ t: 'eof' }); return T;
  }
  // ---------- parser ----------
  function Parser(T) {
    let p = 0;
    const pk = (o = 0) => T[p + o], nx = () => T[p++];
    const isOp = (v, o = 0) => pk(o).t === 'op' && pk(o).v === v, isName = (v, o = 0) => pk(o).t === 'name' && pk(o).v === v;
    const want = (v) => { if (!isOp(v)) throw E('SyntaxError', pk().t === 'eof' ? `'${v}' was never closed or is missing` : 'invalid syntax'); p++; };
    const KW = ['in', 'not', 'and', 'or', 'for', 'del', 'import', 'if', 'else', 'is'];
    function atom() {
      const t = nx();
      if (t.t === 'num') return { k: 'lit', v: t.v };
      if (t.t === 'str') { let s = t.v; while (pk().t === 'str') s += nx().v; return { k: 'lit', v: s }; }
      if (t.t === 'name') { if (t.v === 'True') return { k: 'lit', v: true }; if (t.v === 'False') return { k: 'lit', v: false }; if (t.v === 'None') return { k: 'lit', v: null }; if (KW.includes(t.v)) throw E('SyntaxError', 'invalid syntax'); return { k: 'name', v: t.v }; }
      if (t.t === 'op' && t.v === '(') { if (isOp(')')) { p++; return { k: 'tuple', e: [] }; } const e = expr(); if (isOp(',')) { const a = [e]; while (isOp(',')) { p++; if (isOp(')')) break; a.push(expr()); } want(')'); return { k: 'tuple', e: a }; } want(')'); return e; }
      if (t.t === 'op' && t.v === '[') { const a = []; while (!isOp(']')) { a.push(expr()); if (!isOp(',')) break; p++; } want(']'); return { k: 'list', e: a }; }
      if (t.t === 'op' && t.v === '{') {
        if (isOp('}')) { p++; return { k: 'dict', kv: [] }; }
        const first = expr();
        if (isOp(':')) { p++; const kv = [[first, expr()]]; while (isOp(',')) { p++; if (isOp('}')) break; const k = expr(); want(':'); kv.push([k, expr()]); } want('}'); return { k: 'dict', kv }; }
        const a = [first]; while (isOp(',')) { p++; if (isOp('}')) break; a.push(expr()); } want('}'); return { k: 'set', e: a };
      }
      if (t.t === 'eof') throw E('SyntaxError', 'incomplete input');
      throw E('SyntaxError', 'invalid syntax');
    }
    function postfix() {
      let e = atom();
      for (;;) {
        if (isOp('(')) { p++; const args = []; while (!isOp(')')) { args.push(expr()); if (!isOp(',')) break; p++; } want(')'); e = { k: 'call', f: e, args }; }
        else if (isOp('[')) { p++; const i = expr(); want(']'); e = { k: 'sub', o: e, i }; }
        else if (isOp('.')) { p++; const n = nx(); if (n.t !== 'name') throw E('SyntaxError', 'invalid syntax'); e = { k: 'attr', o: e, n: n.v }; }
        else return e;
      }
    }
    function unary() { if (isOp('-')) { p++; return { k: 'neg', e: unary() }; } if (isOp('+')) { p++; return unary(); } return postfix(); }
    const binL = (next, ops) => () => { let l = next(); while (pk().t === 'op' && ops.includes(pk().v)) { const op = nx().v; l = { k: 'bin', op, l, r: next() }; } return l; };
    const mul = binL(unary, ['*', '/', '//', '%']), add = binL(mul, ['+', '-']), band = binL(add, ['&']), bxor = binL(band, ['^']), bor = binL(bxor, ['|']);
    function cmp() {
      let l = bor();
      for (;;) {
        if (pk().t === 'op' && ['==', '!=', '<', '>', '<=', '>='].includes(pk().v)) { const op = nx().v; l = { k: 'cmp', op, l, r: bor() }; }
        else if (isName('in')) { p++; l = { k: 'cmp', op: 'in', l, r: bor() }; }
        else if (isName('not') && isName('in', 1)) { p += 2; l = { k: 'cmp', op: 'not in', l, r: bor() }; }
        else return l;
      }
    }
    function not_() { if (isName('not')) { p++; return { k: 'not', e: not_() }; } return cmp(); }
    function and_() { let l = not_(); while (isName('and')) { p++; l = { k: 'and', l, r: not_() }; } return l; }
    function expr() { let l = and_(); while (isName('or')) { p++; l = { k: 'or', l, r: and_() }; } return l; }
    function exprList() { const e = expr(); if (!isOp(',')) return e; const a = [e]; while (isOp(',')) { p++; if (pk().t === 'eof' || isOp('=') || isOp(':')) break; a.push(expr()); } return { k: 'tuple', e: a }; }
    function stmt() {
      if (isName('import')) { p++; const n = nx(); if (n.t !== 'name') throw E('SyntaxError', 'invalid syntax'); return { k: 'import', n: n.v }; }
      if (isName('del')) { p++; return { k: 'del', t: postfix() }; }
      if (isName('for')) {
        p++; const vars = []; for (;;) { const n = nx(); if (n.t !== 'name') throw E('SyntaxError', 'invalid syntax'); vars.push(n.v); if (isOp(',')) { p++; continue; } break; }
        if (!isName('in')) throw E('SyntaxError', "expected 'in'"); p++; const it = expr(); want(':'); if (pk().t === 'eof') throw E('SyntaxError', 'write the loop body on the same line, e.g.  for x in s: print(x)'); return { k: 'for', vars, it, body: stmt() };
      }
      const e = exprList();
      if (isOp('=')) { p++; const targets = [e]; let rhs = exprList(); while (isOp('=')) { p++; targets.push(rhs); rhs = exprList(); } return { k: 'assign', targets, e: rhs }; }
      if (pk().t === 'op' && ['+=', '-=', '|=', '&='].includes(pk().v)) { const op = nx().v[0]; return { k: 'assign', targets: [e], e: { k: 'bin', op, l: e, r: exprList() } }; }
      return { k: 'expr', e };
    }
    return { stmt, end: () => pk().t === 'eof', pk };
  }
  // split a line on ; outside strings
  const splitStmts = (line) => { const out = []; let cur = '', q = null; for (const ch of line) { if (q) { cur += ch; if (ch === q) q = null; continue; } if (ch === '"' || ch === "'") { q = ch; cur += ch; continue; } if (ch === ';') { out.push(cur); cur = ''; continue; } if (ch === '#') { cur += ch; q = '\n'; continue; } cur += ch; } out.push(cur); return out.map((s) => s.trim()).filter(Boolean); };

  // ---------- interpreter ----------
  function Interp(hooks) {
    const vars = new Map();
    const ev = hooks.ev;
    const fn = (name, call) => ({ t: 'fn', name, call });
    const BI = {
      print: fn('print', (a) => { hooks.out(a.map(str).join(' ')); return null; }),
      len: fn('len', (a) => lenOf(a[0])),
      min: fn('min', (a) => { const xs = a.length === 1 ? iter(a[0]) : a; if (!xs.length) throw E('ValueError', 'min() arg is an empty sequence'); return xs.reduce((m, x) => cmpv(x, m) < 0 ? x : m); }),
      max: fn('max', (a) => { const xs = a.length === 1 ? iter(a[0]) : a; if (!xs.length) throw E('ValueError', 'max() arg is an empty sequence'); return xs.reduce((m, x) => cmpv(x, m) > 0 ? x : m); }),
      sum: fn('sum', (a) => iter(a[0]).reduce((s, x) => s + (+x), 0)),
      sorted: fn('sorted', (a) => mkList(iter(a[0]).sort(cmpv))),
      set: fn('set', (a) => { if (!a.length) return mkSet([]); const it = iter(a[0]); const s = mkSet(it); if (s.m.size < it.length) ev('dupdrop', { from: it.length, to: s.m.size }); return s; }),
      list: fn('list', (a) => mkList(a.length ? iter(a[0]) : [])),
      tuple: fn('tuple', (a) => mkTuple(a.length ? iter(a[0]) : [])),
      dict: fn('dict', (a) => a.length && a[0].t === 'dict' ? mkDict([...a[0].m.values()].map((p) => [...p])) : mkDict([])),
      type: fn('type', (a) => ({ t: 'type', name: tname(a[0]) })),
      str: fn('str', (a) => a.length ? str(a[0]) : ''),
      int: fn('int', (a) => { const x = a[0]; if (typeof x === 'string') { if (!/^\s*[-+]?\d+\s*$/.test(x)) throw E('ValueError', `invalid literal for int() with base 10: ${qstr(x)}`); return parseInt(x, 10); } return Math.trunc(+x); }),
      float: fn('float', (a) => +a[0]),
      abs: fn('abs', (a) => Math.abs(a[0])),
      range: fn('range', (a) => { const [s, e, st] = a.length === 1 ? [0, a[0], 1] : [a[0], a[1], a[2] || 1]; const r = []; for (let i = s; st > 0 ? i < e : i > e; i += st) { r.push(i); if (r.length > 1000) break; } return mkList(r); }),
      input: fn('input', () => { throw E('RuntimeError', 'input() is not available in this lab: assign the value directly, e.g. name = "Huda"'); }),
    };
    const modules = { getpass: { t: 'mod', name: 'getpass', attrs: { getpass: fn('getpass', () => { throw E('RuntimeError', 'getpass hides what you type, so try it in Python on your computer!'); }) } } };
    const lookup = (n) => { if (vars.has(n)) return vars.get(n); if (BI[n]) return BI[n]; throw E('NameError', `name '${n}' is not defined`); };
    function method(o, n) {
      const T = tname(o), bad = () => { throw E('AttributeError', `'${T}' object has no attribute '${n}'`); };
      if (isObj(o) && o.t === 'mod') { if (o.attrs[n]) return o.attrs[n]; bad(); }
      if (isObj(o) && o.t === 'dict') {
        const M = {
          keys: () => ({ t: 'view', kind: 'dict_keys', a: [...o.m.values()].map((p) => p[0]) }),
          values: () => ({ t: 'view', kind: 'dict_values', a: [...o.m.values()].map((p) => p[1]) }),
          items: () => ({ t: 'view', kind: 'dict_items', a: [...o.m.values()].map((p) => mkTuple([p[0], p[1]])) }),
          get: (k, d = null) => { const h = hash(k); if (o.m.has(h)) { ev('lookup'); return o.m.get(h)[1]; } return d; },
          pop: (k, ...d) => { const h = hash(k); if (o.m.has(h)) { const v = o.m.get(h)[1]; o.m.delete(h); return v; } if (d.length) return d[0]; throw E('KeyError', repr(k)); },
          update: (d) => { if (!isObj(d) || d.t !== 'dict') throw E('TypeError', 'update() needs a dictionary here'); [...d.m.values()].forEach(([k, v]) => { const h = hash(k); if (o.m.has(h)) { o.m.get(h)[1] = v; ev('updkey'); } else o.m.set(h, [k, v]); }); return null; },
          clear: () => { o.m.clear(); return null; }, copy: () => mkDict([...o.m.values()].map((p) => [...p])),
        };
        if (M[n]) return fn(n, (a) => M[n](...a)); bad();
      }
      if (isObj(o) && o.t === 'set') {
        const others = (a) => a.map((x) => mkSet(iter(x)));
        const M = {
          add: (x) => { o.m.set(hash(x), x); ev('add'); return null; },
          update: (...a) => { a.forEach((x) => iter(x).forEach((y) => o.m.set(hash(y), y))); ev('add'); return null; },
          remove: (x) => { const h = hash(x); if (!o.m.has(h)) throw E('KeyError', repr(x)); o.m.delete(h); ev('remove'); return null; },
          discard: (x) => { o.m.delete(hash(x)); ev('discard'); return null; },
          pop: () => { if (!o.m.size) throw E('KeyError', "'pop from an empty set'"); const k = o.m.keys().next().value; const v = o.m.get(k); o.m.delete(k); ev('remove'); return v; },
          clear: () => { o.m.clear(); return null; }, copy: () => mkSet([...o.m.values()]),
          union: (...a) => { ev('op', '|'); return mkSet([...o.m.values(), ...others(a).flatMap((s) => [...s.m.values()])]); },
          intersection: (...a) => { ev('op', '&'); return mkSet([...o.m.values()].filter((x) => others(a).every((s) => s.m.has(hash(x))))); },
          difference: (...a) => { ev('op', '-'); return mkSet([...o.m.values()].filter((x) => !others(a).some((s) => s.m.has(hash(x))))); },
          symmetric_difference: (b) => { ev('op', '^'); return setOp('^', o, mkSet(iter(b))); },
          issubset: (b) => { const s = mkSet(iter(b)); return [...o.m.keys()].every((k) => s.m.has(k)); },
          issuperset: (b) => iter(b).every((x) => o.m.has(hash(x))),
        };
        if (M[n]) return fn(n, (a) => M[n](...a)); bad();
      }
      if (isObj(o) && o.t === 'list') {
        const M = {
          append: (x) => { o.a.push(x); return null; }, count: (x) => o.a.filter((y) => eq(x, y)).length,
          index: (x) => { const i = o.a.findIndex((y) => eq(x, y)); if (i < 0) throw E('ValueError', `${repr(x)} is not in list`); return i; },
          remove: (x) => { const i = o.a.findIndex((y) => eq(x, y)); if (i < 0) throw E('ValueError', 'list.remove(x): x not in list'); o.a.splice(i, 1); return null; },
          pop: (i = -1) => { if (!o.a.length) throw E('IndexError', 'pop from empty list'); return o.a.splice(i < 0 ? o.a.length + i : i, 1)[0]; },
          sort: () => { o.a.sort(cmpv); return null; },
        };
        if (M[n]) return fn(n, (a) => M[n](...a)); bad();
      }
      if (isObj(o) && o.t === 'tuple') { if (n === 'count') return fn(n, (a) => o.a.filter((y) => eq(a[0], y)).length); if (n === 'index') return fn(n, (a) => o.a.findIndex((y) => eq(a[0], y))); bad(); }
      if (typeof o === 'string') { const M = { upper: () => o.toUpperCase(), lower: () => o.toLowerCase(), strip: () => o.trim(), split: (s) => mkList(s == null ? o.trim().split(/\s+/) : o.split(s)), count: (s) => o.split(s).length - 1 }; if (M[n]) return fn(n, (a) => M[n](...a)); }
      bad();
    }
    function setOp(op, a, b) {
      const A = [...a.m.values()], inB = (x) => b.m.has(hash(x)), inA = (x) => a.m.has(hash(x));
      if (op === '|') return mkSet([...A, ...b.m.values()]);
      if (op === '&') return mkSet(A.filter(inB));
      if (op === '-') return mkSet(A.filter((x) => !inB(x)));
      return mkSet([...A.filter((x) => !inB(x)), ...[...b.m.values()].filter((x) => !inA(x))]);
    }
    function binop(op, a, b) {
      const num = (x) => typeof x === 'number' || typeof x === 'boolean';
      const unsup = () => { throw E('TypeError', `unsupported operand type(s) for ${op}: '${tname(a)}' and '${tname(b)}'`); };
      if (isObj(a) && isObj(b) && a.t === 'set' && b.t === 'set' && '|&-^'.includes(op)) { ev('op', op); return setOp(op, a, b); }
      if (op === '|' && isObj(a) && isObj(b) && a.t === 'dict' && b.t === 'dict') return mkDict([...a.m.values(), ...b.m.values()].map((p) => [...p]));
      if (num(a) && num(b)) {
        a = +a; b = +b;
        switch (op) { case '+': return a + b; case '-': return a - b; case '*': return a * b; case '/': if (!b) throw E('ZeroDivisionError', 'division by zero'); return a / b; case '//': if (!b) throw E('ZeroDivisionError', 'integer division or modulo by zero'); return Math.floor(a / b); case '%': if (!b) throw E('ZeroDivisionError', 'integer modulo by zero'); return ((a % b) + b) % b; case '|': return a | b; case '&': return a & b; case '^': return a ^ b; }
      }
      if (op === '+' && typeof a === 'string' && typeof b === 'string') return a + b;
      if (op === '+' && isObj(a) && isObj(b) && a.t === b.t && (a.t === 'list' || a.t === 'tuple')) return { t: a.t, a: [...a.a, ...b.a] };
      if (op === '*' && typeof a === 'string' && typeof b === 'number') return a.repeat(Math.max(0, b));
      if (op === '*' && isObj(a) && a.t === 'list' && typeof b === 'number') return mkList([].concat(...Array(Math.max(0, b)).fill(a.a)));
      unsup();
    }
    function contains(c, x) {
      if (typeof c === 'string') { if (typeof x !== 'string') throw E('TypeError', "'in <string>' requires string as left operand"); return c.includes(x); }
      if (isObj(c)) { if (c.t === 'set' || c.t === 'dict') return c.m.has(hash(x)); if (c.t === 'list' || c.t === 'tuple' || c.t === 'view') return c.a.some((y) => eq(x, y)); }
      throw E('TypeError', `argument of type '${tname(c)}' is not iterable`);
    }
    function idx(o, i) {
      if (isObj(o) && o.t === 'dict') { const h = hash(i); if (!o.m.has(h)) throw E('KeyError', repr(i)); ev('lookup'); return o.m.get(h)[1]; }
      if (typeof o === 'string' || (isObj(o) && (o.t === 'list' || o.t === 'tuple'))) {
        if (typeof i !== 'number' || !Number.isInteger(i)) throw E('TypeError', `${tname(o)} indices must be integers, not ${tname(i)}`);
        const arr = typeof o === 'string' ? o : o.a; const j = i < 0 ? arr.length + i : i; if (j < 0 || j >= arr.length) throw E('IndexError', `${tname(o)} index out of range`); return arr[j];
      }
      if (isObj(o) && o.t === 'set') throw E('TypeError', "'set' object is not subscriptable: sets have no order or index");
      throw E('TypeError', `'${tname(o)}' object is not subscriptable`);
    }
    function ev_(n) {
      switch (n.k) {
        case 'lit': return n.v;
        case 'name': return lookup(n.v);
        case 'list': return mkList(n.e.map(ev_));
        case 'tuple': return mkTuple(n.e.map(ev_));
        case 'set': { const items = n.e.map(ev_); const s = mkSet(items); if (s.m.size < items.length) ev('dupdrop', { from: items.length, to: s.m.size }); return s; }
        case 'dict': { const pairs = n.kv.map(([k, v]) => [ev_(k), ev_(v)]); const d = mkDict(pairs); if (d.m.size < pairs.length) ev('dupkey'); return d; }
        case 'neg': { const v = ev_(n.e); if (typeof v !== 'number' && typeof v !== 'boolean') throw E('TypeError', `bad operand type for unary -: '${tname(v)}'`); return -v; }
        case 'not': return !truthy(ev_(n.e));
        case 'and': { const l = ev_(n.l); return truthy(l) ? ev_(n.r) : l; }
        case 'or': { const l = ev_(n.l); return truthy(l) ? l : ev_(n.r); }
        case 'bin': return binop(n.op, ev_(n.l), ev_(n.r));
        case 'cmp': { const l = ev_(n.l), r = ev_(n.r); switch (n.op) { case '==': { const q = eq(l, r); ev('eq', q); return q; } case '!=': return !eq(l, r); case 'in': ev('in', tname(r)); return contains(r, l); case 'not in': ev('in', tname(r)); return !contains(r, l); }
          if (isObj(l) && isObj(r) && l.t === 'set' && r.t === 'set') { const sub = (a, b) => [...a.m.keys()].every((k) => b.m.has(k)); return n.op === '<=' ? sub(l, r) : n.op === '>=' ? sub(r, l) : n.op === '<' ? sub(l, r) && l.m.size < r.m.size : sub(r, l) && r.m.size < l.m.size; }
          const c = cmpv(l, r); return n.op === '<' ? c < 0 : n.op === '>' ? c > 0 : n.op === '<=' ? c <= 0 : c >= 0; }
        case 'sub': return idx(ev_(n.o), ev_(n.i));
        case 'attr': return method(ev_(n.o), n.n);
        case 'call': {
          const f = ev_(n.f); if (!isObj(f) || f.t !== 'fn') throw E('TypeError', `'${tname(f)}' object is not callable`);
          const args = n.args.map(ev_);
          if (f.name === 'list' && n.args.length === 1 && n.args[0].k === 'call' && n.args[0].f.k === 'name' && n.args[0].f.v === 'set') { const inner = n.args[0].args[0] ? ev_(n.args[0].args[0]) : null; if (inner && isObj(inner) && (inner.t === 'list' || inner.t === 'tuple') && mkSet(inner.a).m.size < inner.a.length) ev('dedup'); }
          return f.call(args);
        }
      }
      throw E('SyntaxError', 'invalid syntax');
    }
    function assign(t, v) {
      if (t.k === 'name') { if (BI[t.v] && !vars.has(t.v)) hooks.warn(`⚠ "${t.v}" is a Python built-in name. Pick another name so ${t.v}() still works.`); vars.set(t.v, v); hooks.touch(t.v); return; }
      if (t.k === 'sub') {
        const o = ev_(t.o), i = ev_(t.i);
        if (isObj(o) && o.t === 'dict') { const h = hash(i); if (o.m.has(h)) { o.m.get(h)[1] = v; ev('updkey'); } else { o.m.set(h, [i, v]); ev('newkey'); } if (t.o.k === 'name') hooks.touch(t.o.v); return; }
        if (isObj(o) && o.t === 'list') { const j = i < 0 ? o.a.length + i : i; if (typeof i !== 'number' || j < 0 || j >= o.a.length) throw E('IndexError', 'list assignment index out of range'); o.a[j] = v; if (t.o.k === 'name') hooks.touch(t.o.v); return; }
        throw E('TypeError', `'${tname(o)}' object does not support item assignment`);
      }
      if (t.k === 'tuple' || t.k === 'list') { const vs = iter(v); if (vs.length !== t.e.length) throw E('ValueError', `expected ${t.e.length} values to unpack, got ${vs.length}`); t.e.forEach((x, i) => assign(x, vs[i])); return; }
      throw E('SyntaxError', 'cannot assign to expression');
    }
    function exec(s, echo) {
      switch (s.k) {
        case 'import': if (!modules[s.n]) throw E('ModuleNotFoundError', `No module named '${s.n}' in this lab`); vars.set(s.n, modules[s.n]); return;
        case 'del': { const t = s.t; if (t.k === 'name') { if (!vars.has(t.v)) throw E('NameError', `name '${t.v}' is not defined`); vars.delete(t.v); hooks.touch(null); return; } if (t.k === 'sub') { const o = ev_(t.o), i = ev_(t.i); if (isObj(o) && o.t === 'dict') { const h = hash(i); if (!o.m.has(h)) throw E('KeyError', repr(i)); o.m.delete(h); if (t.o.k === 'name') hooks.touch(t.o.v); return; } if (isObj(o) && o.t === 'list') { o.a.splice(i < 0 ? o.a.length + i : i, 1); return; } throw E('TypeError', `'${tname(o)}' object doesn't support item deletion`); } throw E('SyntaxError', 'cannot delete expression'); }
        case 'assign': { const v = ev_(s.e); s.targets.forEach((t) => assign(t, v)); return; }
        case 'for': { const it = iter(ev_(s.it)); let n = 0; for (const x of it) { if (++n > 500) throw E('RuntimeError', 'loop stopped after 500 rounds'); if (s.vars.length === 1) vars.set(s.vars[0], x); else { const vs = iter(x); if (vs.length !== s.vars.length) throw E('ValueError', `expected ${s.vars.length} values to unpack, got ${vs.length}`); s.vars.forEach((nm, i) => vars.set(nm, vs[i])); } exec(s.body, false); } ev('loop'); hooks.touch(s.vars[0]); return; }
        case 'expr': { const v = ev_(s.e); if (echo && v !== null) hooks.echo(repr(v)); return; }
      }
    }
    return {
      vars,
      run(line) { for (const part of splitStmts(line)) { const P = Parser(tokenize(part)); const s = P.stmt(); if (!P.end()) throw E('SyntaxError', 'invalid syntax'); exec(s, true); } },
      reset() { vars.clear(); },
    };
  }

  // ---------- missions ----------
  const MISSIONS = [
    { id: 'dict', t: 'Make a dictionary with at least 3 names and phone numbers', hint: 'phone = {"Huda": "0555", "Amir": "0553", "Noura": "0554"}', demo: ['phone = {"Huda": "0555", "Amir": "0553", "Noura": "0554"}'] },
    { id: 'look', t: 'Look up one number by its KEY', hint: 'phone["Huda"]', demo: ['phone["Huda"]'] },
    { id: 'upd', t: 'Change the value of a key that already exists', hint: 'phone["Amir"] = "0599"', demo: ['phone["Amir"] = "0599"', 'phone'] },
    { id: 'loop', t: 'Print every key and value with .items()', hint: 'for name, num in phone.items(): print(name, num)', demo: ['for name, num in phone.items(): print(name, num)'] },
    { id: 'set', t: 'Make a set with duplicates and watch them vanish', hint: 'ids = {101, 102, 102, 103, 103}', demo: ['ids = {101, 102, 102, 103, 103}', 'len(ids)'] },
    { id: 'meth', t: 'Use add() and discard() on your set', hint: 'ids.add(104); ids.discard(999)', demo: ['ids.add(104)', 'ids.discard(999)', 'ids'] },
    { id: 'ops', t: 'Challenge 3: compare two sets with 2 different operators (| & - ^)', hint: 'multiples_of_2 & multiples_of_3', demo: ['multiples_of_2 = {2, 4, 6, 8, 10, 12}', 'multiples_of_3 = {3, 6, 9, 12}', 'multiples_of_2 & multiples_of_3', 'multiples_of_2 | multiples_of_3', 'multiples_of_2 - multiples_of_3'] },
    { id: 'dedup', t: 'Challenge 2: remove duplicates from a list with list(set(...))', hint: 'attendees = ["Ali", "Sara", "Ali"]; list(set(attendees))', demo: ['attendees = ["Ali", "Sara", "Omar", "Ali", "Sara"]', 'unique = list(set(attendees))', 'print(unique, len(unique))'] },
  ];
  const CHIPS = ['{ }', '[ ]', ':', '" "', '.add()', '.discard()', '.remove()', '.items()', ' | ', ' & ', ' - ', ' ^ ', 'len()', 'set()', 'print()'];

  window.mountLab = function (root, opts = {}) {
    if (!document.getElementById('pl-css')) { const st = document.createElement('style'); st.id = 'pl-css'; st.textContent = CSS; document.head.appendChild(st); }
    const el = document.createElement('div'); el.className = 'pl'; el.style.setProperty('--plfs', opts.fs || '18px'); el.style.setProperty('--plh', opts.height || '640px');
    el.innerHTML = `<div class="pl-next"><span class="tag">NEXT</span><span class="txt"></span><button class="pl-btn w" data-a="show">▶ Show me</button></div>
      <div class="pl-term"><div class="pl-bar"><i style="background:#ff6b6b"></i><i style="background:#ffc61a"></i><i style="background:#33c257"></i>&nbsp;Python lab · type a line and press Enter</div><div class="pl-out"></div><div class="pl-row"><span>&gt;&gt;&gt;</span><input spellcheck="false" autocomplete="off" placeholder='phone = {"Huda": "0555"}'><button class="pl-btn g" data-a="run">Run ▶</button></div><div class="pl-chips">${(opts.chips || CHIPS).map((c) => `<button data-c="${c.replace(/"/g, '&quot;')}">${c.trim()}</button>`).join('')}</div></div>
      <div class="pl-side"><div class="pl-vars"><div class="pl-h">Your variables</div><div class="vl"></div></div><div class="pl-mis"><div class="pl-h">Missions</div><div class="ml"></div></div></div>`;
    root.appendChild(el);
    const out = el.querySelector('.pl-out'), inp = el.querySelector('.pl-row input'), vl = el.querySelector('.vl'), ml = el.querySelector('.ml');
    const write = (t, cls) => { const d = document.createElement('div'); if (cls) d.className = cls; d.textContent = t; out.appendChild(d); out.scrollTop = out.scrollHeight; return d; };
    let flags = {}, touched = new Set();
    const evh = (k, x) => { if (k === 'op') { flags.ops = flags.ops || new Set(); flags.ops.add(x); } else if (k === 'in') { flags['in_' + x] = true; } else if (k === 'eq') { if (x) flags.eqtrue = true; } else flags[k] = true; if (k === 'dupdrop') write(`✨ ${x.from} items in → ${x.to} unique in the set (duplicates removed)`, 'info'); if (k === 'updkey') write('♻ That key already existed, so its value was replaced (keys stay unique).', 'info'); };
    let py = Interp({ out: (t) => write(t), echo: (t) => write(t, 'ok'), warn: (t) => write(t, 'info'), touch: (n) => n && touched.add(n), ev: evh });
    const hist = []; let hi = 0;
    const MS = opts.missions || MISSIONS;
    const done = (id) => {
      const V = [...py.vars.values()];
      const cm = MS.find((m) => m.id === id); if (cm && cm.check) { try { return !!cm.check({ vars: py.vars, V, flags, tname, isObj, lenOf }); } catch (e) { return false; } }
      switch (id) {
        case 'dict': return V.some((v) => isObj(v) && v.t === 'dict' && v.m.size >= 3);
        case 'look': return !!flags.lookup; case 'upd': return !!flags.updkey; case 'loop': return !!flags.loop;
        case 'set': return !!flags.dupdrop; case 'meth': return !!(flags.add && flags.discard);
        case 'ops': return !!(flags.ops && flags.ops.size >= 2); case 'dedup': return !!flags.dedup;
      } return false;
    };
    const sticky = new Set();
    const tasks = () => MS.map((m) => { if (done(m.id)) sticky.add(m.id); return [m.t, sticky.has(m.id)]; });
    function paintVars() {
      const names = [...py.vars.keys()].filter((n) => !(isObj(py.vars.get(n)) && py.vars.get(n).t === 'mod'));
      if (!names.length) { vl.innerHTML = '<div class="pl-empty">Nothing yet. Make a dictionary or a set!</div>'; return; }
      const C = { dict: '#5B5BF0', set: '#FF5D73', list: '#1C9BEF', tuple: '#9B5DE5', str: '#12B886', int: '#FFB020', float: '#FFB020', bool: '#E8337C' };
      vl.innerHTML = '';
      names.slice(-8).reverse().forEach((n) => {
        const v = py.vars.get(n), T = tname(v); const d = document.createElement('div'); d.className = 'pl-v' + (touched.has(n) ? ' flash' : '');
        let body = '';
        const r = (x) => repr(x).replace(/&/g, '&amp;').replace(/</g, '&lt;');
        if (T === 'dict') body = [...v.m.values()].slice(0, 10).map(([k, x]) => `<span class="pl-kv"><b>${r(k)}</b><i>${r(x)}</i></span>`).join('') + (v.m.size ? '' : '<span class="pl-el" style="background:#eef0ff;color:#4338ca">{} empty</span>');
        else if (T === 'set') body = setOrder([...v.m.values()]).slice(0, 14).map((x) => `<span class="pl-el">${r(x)}</span>`).join('') || '<span class="pl-el">set() empty</span>';
        else if (T === 'list' || T === 'tuple') body = v.a.slice(0, 12).map((x, i) => `<span class="pl-li">${r(x)}<sub>${i}</sub></span>`).join('') + (T === 'tuple' ? ' 🔒' : '') || '<span class="pl-li">empty</span>';
        else body = `<span class="pl-li" style="background:#f3f4fb;color:#1B1F3B">${r(v)}</span>`;
        const len = (T === 'dict' || T === 'set') ? v.m.size : (T === 'list' || T === 'tuple') ? v.a.length : null;
        d.innerHTML = `<div class="nm">${n}<span class="ty" style="background:${C[T] || '#7a80a6'}">${T}${len != null ? ' · ' + len : ''}</span></div><div class="bd">${body}</div>`;
        vl.appendChild(d);
      });
      touched = new Set();
    }
    let nextM = null;
    function paintMissions() {
      const ts = tasks(); nextM = MS.find((m, i) => !ts[i][1]);
      ml.innerHTML = MS.map((m, i) => `<div class="pl-m ${ts[i][1] ? 'on' : (m === nextM ? 'cur' : '')}"><span class="ck">${ts[i][1] ? '✓' : i + 1}</span><span>${m.t}</span><button class="sm" data-m="${i}">show</button></div>`).join('');
      el.querySelector('.pl-next .txt').innerHTML = nextM ? `${nextM.t}<br><code>${nextM.hint.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</code>` : (opts.doneText || '🎉 All missions complete! Try your own ideas: sets of friends, dictionaries of prices…');
      ml.querySelectorAll('[data-m]').forEach((b) => b.onclick = () => playDemo(MS[+b.dataset.m]));
    }
    const paint = () => { paintVars(); paintMissions(); opts.onChange && opts.onChange(); };
    function runLine(line) {
      line = line.trim(); if (!line) return;
      hist.push(line); hi = hist.length;
      const d = write('', 'in'); d.innerHTML = '<b>&gt;&gt;&gt;</b> '; d.appendChild(document.createTextNode(line));
      try { py.run(line); } catch (e) { if (e instanceof PyErr) write(`${e.type}: ${e.message}`, 'err'); else write('Error: ' + e.message, 'err'); }
      paint();
    }
    el.querySelector('[data-a="run"]').onclick = () => { runLine(inp.value); inp.value = ''; inp.focus(); };
    inp.addEventListener('keydown', (e) => { e.stopPropagation(); if (e.key === 'Enter') { runLine(inp.value); inp.value = ''; } else if (e.key === 'ArrowUp') { if (hi > 0) inp.value = hist[--hi] || ''; e.preventDefault(); } else if (e.key === 'ArrowDown') { hi = Math.min(hist.length, hi + 1); inp.value = hist[hi] || ''; e.preventDefault(); } });
    el.querySelectorAll('[data-c]').forEach((b) => b.onclick = () => { const c = b.dataset.c; const s = inp.selectionStart ?? inp.value.length; inp.value = inp.value.slice(0, s) + c + inp.value.slice(s); const pos = s + (/[)\]}"]$/.test(c.trim()) && c.trim().length > 1 ? c.length - 1 : c.length); inp.focus(); inp.setSelectionRange(pos, pos); });
    let busy = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    async function typeRun(line) { inp.value = ''; for (const ch of line) { inp.value += ch; await sleep(line.length > 40 ? 12 : 22); } await sleep(250); runLine(inp.value); inp.value = ''; await sleep(450); }
    async function playDemo(m) { if (busy) return; busy = true; for (const l of m.demo) await typeRun(l); busy = false; }
    el.querySelector('[data-a="show"]').onclick = () => nextM && playDemo(nextM);
    (opts.welcome || ['Welcome to the Python lab! 🐍 Dictionaries, sets, lists and tuples work here.', 'Try:  ids = {1, 2, 2, 3}']).forEach((t) => write(t, 'info'));
    paint();
    return {
      el, tasks,
      demoStep() { if (busy || !nextM) return false; playDemo(nextM); return true; },
      async demo() { for (const m of MS) if (!sticky.has(m.id)) await playDemo(m); },
      reset() { py.reset(); flags = {}; sticky.clear(); out.innerHTML = ''; write('Fresh start! 🐍', 'info'); paint(); },
      focus() { inp.focus(); },
      _run: runLine,
    };
  };
})();

