(this["webpackJsonptodo-app"]=this["webpackJsonptodo-app"]||[]).push([[0],{37:function(t,e,i){},38:function(t,e,i){"use strict";i.r(e);var n=i(0),c=i.n(n),o=i(13),s=i.n(o),a=i(25),r=i(3),l=i(17),d=i(24),b=i.n(d),j=i(15),u=i(16),m=function(){function t(){Object(j.a)(this,t)}return Object(u.a)(t,null,[{key:"getLists",value:function(){var t=localStorage.getItem("todo-app:lists");return t?JSON.parse(t):[]}},{key:"setLists",value:function(t){var e=JSON.stringify(t);localStorage.setItem("todo-app:lists",e)}}]),t}(),g={lists:m.getLists()},p=Object(l.b)({name:"todo",initialState:g,reducers:{addNewList:function(t,e){var i=e.payload.todoListId,n=e.payload.todoListTitle;t.lists.push({id:i,title:n,items:[]}),m.setLists(t.lists)},addItemToExistingList:function(t,e){var i=e.payload.todoListId,n=e.payload.todoItem,c=t.lists.find((function(t){return t.id===i}));c&&(c.items.push(n),m.setLists(t.lists))},editItem:function(t,e){var i=e.payload.todoListId,n=e.payload.todoItem,c=t.lists.find((function(t){return t.id===i}));if(c){var o=c.items.find((function(t){return t.id===n.id}));o&&(o.title=n.title,o.isComplete=n.isComplete,m.setLists(t.lists))}},deleteItem:function(t,e){var i=e.payload.todoListId,n=e.payload.todoItemId,c=t.lists.find((function(t){return t.id===i}));if(c){var o=c.items.filter((function(t){return t.id!==n}));c.items=o,m.setLists(t.lists)}}}}),x=p.actions,O=x.addNewList,f=x.addItemToExistingList,h=x.deleteItem,v=x.editItem,y=p.reducer,N=Object(l.a)({reducer:{todo:y},middleware:function(t){return t().concat(b.a)}}),I=i(9),C=i(1);var L=function(){var t,e=Object(I.b)(),i=Object(I.c)((function(t){return t.todo.lists}));if(console.log("process.env:",Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_OPERATION_STYLE:"click"})),0===i.length){e(O({todoListId:"1",todoListTitle:"Untitled List"})),t="/todos/".concat("1")}else{var n=i[0];t="/todos/".concat(n.id)}return Object(C.jsx)(r.a,{to:t})};var S=function(){return Object(C.jsx)("div",{className:"h-screen bg-gray-100",children:Object(C.jsx)("div",{className:"py-8",children:Object(C.jsxs)("div",{className:"w-100 max-w-sm mx-auto bg-white rounded p-4 text-center",children:[Object(C.jsx)("h1",{className:"text-lg font-bold text-gray-800",children:"Not Found"}),Object(C.jsx)("p",{children:"Check your URL and try again."})]})})})},k=i(11),w=function(){function t(){Object(j.a)(this,t)}return Object(u.a)(t,null,[{key:"getTodoListById",value:function(t,e){return t.todo.lists.find((function(t){return t.id===e}))}}]),t}(),T=i(8),E=i(23);function _(t){var e=t.item,i=t.isSelected,c=t.onContextToggle,o=t.onEdit,s=t.onDelete,a=Object(n.useState)(e.title),r=Object(k.a)(a,2),l=r[0],d=r[1];Object(n.useEffect)((function(){i||d(e.title)}),[e,i]);var b=Object(n.useMemo)((function(){return e.title!==l}),[e,l]);return Object(C.jsxs)("div",{className:"bg-blue-100 bg-opacity-50 transition hover:bg-opacity-80 ",children:[Object(C.jsxs)("div",{className:"flex items-stretch overflow-hidden","data-id":e.id,children:[Object(C.jsx)("div",{className:"px-5 py-4 transition bg-indigo-200 bg-opacity-0 hover:bg-opacity-40 cursor-pointer",onClick:function(){var t=Object(E.clone)(e);t.isComplete=!e.isComplete,o(t)},children:Object(C.jsx)("input",{type:"checkbox",checked:e.isComplete,className:"checked:bg-blue-600 checked:border-transparent",onChange:function(){}})}),Object(C.jsxs)("div",{className:"flex-grow",children:[!i&&Object(C.jsx)("div",{className:"p-4 leading-tight",children:e.title}),i&&Object(C.jsx)("textarea",{className:"p-4 w-full leading-tight bg-transparent",name:"title",value:l,disabled:!i,onChange:function(t){d(t.target.value)}})]}),Object(C.jsxs)("div",{className:"p-4 text-gray-500 transition bg-indigo-200 bg-opacity-0 hover:bg-opacity-40 cursor-pointer ",onClick:function(){return c(e)},children:[!!i&&Object(C.jsx)(T.a,{className:"w-6 h-6"}),!i&&Object(C.jsx)(T.b,{className:"w-6 h-6"})]})]}),!!i&&Object(C.jsxs)("div",{className:"flex items-center justify-end",children:[Object(C.jsx)("div",{className:"p-4 ".concat(b?"bg-indigo-500 bg-opacity-60 hover:bg-opacity-100 cursor-pointer":"bg-gray-200"," text-gray-100 transition "),onClick:function(){if(b){var t=Object(E.clone)(e);t.title=l,o(t)}},children:Object(C.jsx)(T.e,{className:"w-6 h-6"})}),Object(C.jsx)("div",{className:"p-4 bg-red-500 bg-opacity-60 hover:bg-opacity-100 text-gray-100 cursor-pointer transition",onClick:function(){return s(e)},children:Object(C.jsx)(T.f,{className:"w-6 h-6"})})]})]})}var D=i(26);function F(t){return Object(C.jsx)(_,Object(D.a)({},t))}function P(t){var e=t.filterOption,i=t.onClick;return Object(C.jsxs)("div",{className:"flex w-36 items-center bg-indigo-300 bg-opacity-60 transition hover:bg-opacity-100 rounded-tl-lg px-3 py-2 cursor-pointer text-gray-600",onClick:i,children:[Object(C.jsx)(T.d,{className:"w-4 h-4"}),Object(C.jsx)("span",{className:"ml-2",children:e.label})]})}var A=[{index:0,key:"incomplete",label:"Incomplete"},{index:1,key:"completed",label:"Completed"},{index:2,key:"all",label:"All"}];var H=function(){var t=Object(I.b)(),e=Object(r.g)(),i=Object(I.c)((function(t){return t})),c=Object(n.useState)(""),o=Object(k.a)(c,2),s=o[0],a=o[1],l=Object(n.useState)(A[0]),d=Object(k.a)(l,2),b=d[0],j=d[1],u=Object(n.useState)(""),m=Object(k.a)(u,2),g=m[0],p=m[1],x=e.id,O=w.getTodoListById(i,x),y=Object(n.useMemo)((function(){return O?"incomplete"===b.key?O.items.filter((function(t){return!t.isComplete})):"completed"===b.key?O.items.filter((function(t){return!!t.isComplete})):O.items:[]}),[b,O]),N=function(t){g!==t.id?p(t.id):p("")},L=function(e){console.log("onTodoItemEditHandler triggered."),t(v({todoListId:x,todoItem:e})),p("")},S=function(e){console.log("onTodoItemDeleteHandler triggered."),t(h({todoListId:x,todoItemId:e.id})),p("")};return Object(C.jsx)("div",{className:"h-screen bg-gray-100",children:Object(C.jsxs)("div",{className:"w-100 max-w-xl h-full mx-auto bg-white py-4 md:px-4",children:[Object(C.jsx)("h1",{className:"text-lg font-bold text-gray-800 text-center leading-tight p-4",children:null===O||void 0===O?void 0:O.title}),Object(C.jsxs)("div",{className:"mt-4 flex justify-between",children:[Object(C.jsx)("div",{}),Object(C.jsx)("div",{children:Object(C.jsx)(P,{filterOption:b,onClick:function(){console.log("onFilterOperatorClickHandler triggered.");var t=(b.index+1)%A.length;j(A[t]),p("")}})})]}),Object(C.jsx)("div",{className:"",children:y.map((function(t,e){return Object(C.jsx)(F,{item:t,isSelected:t.id===g,onContextToggle:N,onEdit:L,onDelete:S},t.id)}))}),Object(C.jsx)("div",{children:Object(C.jsx)("form",{onSubmit:function(e){e.preventDefault(),console.log("onSubmitHandler triggered. e:",e);var i={id:Math.floor(1e6*Math.random()).toString(),title:s,isComplete:!1};t(f({todoListId:x,todoItem:i})),a("")},children:Object(C.jsxs)("div",{className:"flex items-center",children:[Object(C.jsx)("input",{className:"p-4 bg-gray-50 focus:bg-gray-100 flex-grow",type:"text",name:"title",value:s,onChange:function(t){a(t.target.value)},placeholder:"New item..."}),Object(C.jsx)("button",{className:"px-3 py-4 bg-green-300 bg-opacity-60 transition hover:bg-opacity-100",type:"submit",children:"Add"})]})})}),Object(C.jsx)("div",{className:"my-8",children:Object(C.jsx)(T.c,{className:"w-16 h-16 text-gray-100 m-auto"})})]})})};var R=function(){return Object(C.jsx)(I.a,{store:N,children:Object(C.jsx)(a.a,{basename:"",children:Object(C.jsxs)(r.d,{children:[Object(C.jsx)(r.b,{path:"/todos/:id",exact:!0,children:Object(C.jsx)(H,{})}),Object(C.jsx)(r.b,{path:"/",exact:!0,children:Object(C.jsx)(L,{})}),Object(C.jsx)(r.b,{children:Object(C.jsx)(S,{})})]})})})},B=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,39)).then((function(e){var i=e.getCLS,n=e.getFID,c=e.getFCP,o=e.getLCP,s=e.getTTFB;i(t),n(t),c(t),o(t),s(t)}))};i(37);s.a.render(Object(C.jsx)(c.a.StrictMode,{children:Object(C.jsx)(R,{})}),document.getElementById("root")),B()}},[[38,1,2]]]);
//# sourceMappingURL=main.88cd69fe.chunk.js.map