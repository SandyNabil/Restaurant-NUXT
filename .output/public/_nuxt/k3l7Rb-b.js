import{u as F,r as f,c as d,a,b as s,w as C,v as P,F as p,d as _,e as y,o as l,t as m,f as N,g as M,n as $,_ as A}from"./23-1XH84.js";import{u as L}from"./CIWgJfHO.js";function V(){const h=F(),{data:n,pending:g,error:x}=L(`${h.public.apiBase}`,"$ogSYMnO7d0");return{data:n,pending:g,error:x}}const D={class:"max-w-4xl mx-auto p-4"},U={class:"flex align-middle justify-center gap-4"},z={class:"flex justify-center mb-6"},E=["value"],O={class:"flex justify-center mb-6"},Y={key:0,class:"text-center text-gray-600 text-4xl"},q={key:1,class:"text-red-500 text-center text-4xl"},G={key:2,class:"text-center text-gray-500 text-4xl"},H={key:3,class:"space-y-4"},I=["src","alt"],J={class:"flex-1"},K={class:"text-xl font-semibold text-gray-900"},Q={class:"text-gray-600 text-md"},W={class:"flex justify-center mt-6 space-x-2"},X=["disabled"],Z=["onClick"],ee=["disabled"],b=5,oe={__name:"index",setup(h){const{data:n,pending:g,error:x}=V(),c=f("All"),i=f("name"),R=d(()=>{var e;const o=((e=n==null?void 0:n.value)==null?void 0:e.recipes.flatMap(u=>u.tags))||[];return["All",...new Set(o)]}),k=d(()=>{var o,e;return c.value==="All"?((o=n==null?void 0:n.value)==null?void 0:o.recipes)||[]:(e=n==null?void 0:n.value)==null?void 0:e.recipes.filter(u=>u.tags.includes(c.value))}),T=d(()=>[...k.value].sort((o,e)=>i.value==="name"?o.name.localeCompare(e.name):i.value==="rating"?e.rating-o.rating:i.value==="cookingTime"?o.cookingTime-e.cookingTime:0)),r=f(1),S=d(()=>{const o=(r.value-1)*b,e=o+b;return T.value.slice(o,e)}),v=d(()=>Math.ceil(k.value.length/b)),j=()=>{r.value<v.value&&r.value++},B=()=>{r.value>1&&r.value--};return(o,e)=>{var w;const u=A;return l(),a("div",D,[e[5]||(e[5]=s("h1",{class:"text-3xl font-bold mb-6 text-center text-orange-500"},"Recipes",-1)),s("div",U,[s("div",z,[e[2]||(e[2]=s("label",{for:"tag-filter",class:"mr-2 text-md font-medium text-gray-700 self-center"},"Filter by tag:",-1)),C(s("select",{id:"tag-filter","onUpdate:modelValue":e[0]||(e[0]=t=>c.value=t),class:"px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700"},[(l(!0),a(p,null,_(R.value,t=>(l(),a("option",{key:t,value:t},m(t),9,E))),128))],512),[[P,c.value]])]),s("div",O,[e[4]||(e[4]=s("label",{for:"sort-filter",class:"mr-2 text-md font-medium text-gray-700 self-center"},"Sort by:",-1)),C(s("select",{id:"sort-filter","onUpdate:modelValue":e[1]||(e[1]=t=>i.value=t),class:"px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 text-gray-700"},e[3]||(e[3]=[s("option",{value:"name"},"Name",-1),s("option",{value:"rating"},"Rating",-1),s("option",{value:"cookingTime"},"Cooking Time",-1)]),512),[[P,i.value]])])]),y(g)?(l(),a("div",Y,"Loading recipes...")):y(x)?(l(),a("div",q,"Failed to load recipes.")):((w=y(n))==null?void 0:w.recipes.length)===0?(l(),a("div",G," No recipes found. ")):(l(),a("div",H,[(l(!0),a(p,null,_(S.value,t=>(l(),N(u,{key:t.id,to:`/recipe/${t.id}`,class:"block bg-white shadow-md rounded-lg overflow-hidden flex items-center p-4 gap-4 hover:bg-gray-100"},{default:M(()=>[s("img",{src:t.image,alt:t.name,class:"w-32 h-32 object-cover rounded-md"},null,8,I),s("div",J,[s("h3",K,m(t.name),1),s("p",Q,m(t.cuisine)+" Cuisine",1)])]),_:2},1032,["to"]))),128))])),s("div",W,[s("button",{onClick:B,disabled:r.value===1,class:"px-4 py-2 rounded-full text-sm font-medium bg-gray-900 text-white cursor-pointer"},"Previous",8,X),(l(!0),a(p,null,_(v.value,t=>(l(),a("span",{key:t,onClick:te=>r.value=t,class:$(["px-4 py-2 rounded-full text-sm font-medium cursor-pointer",r.value===t?"bg-gray-900 text-white":"bg-gray-200 text-gray-700"])},m(t),11,Z))),128)),s("button",{onClick:j,disabled:r.value===v.value,class:"px-4 py-2 rounded-full text-sm font-medium bg-gray-900 text-white cursor-pointer"},"Next",8,ee)])])}}};export{oe as default};
