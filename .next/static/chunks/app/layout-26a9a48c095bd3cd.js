(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{739:function(t,e,s){Promise.resolve().then(s.t.bind(s,8877,23)),Promise.resolve().then(s.bind(s,4114)),Promise.resolve().then(s.t.bind(s,2445,23)),Promise.resolve().then(s.t.bind(s,2394,23))},4114:function(t,e,s){"use strict";s.d(e,{default:function(){return b}});var i=s(7437),a=s(6298),r=s(2459),n=s(9948),u=s(9010),o=class extends u.l{constructor(t={}){super(),this.config=t,this.#t=new Map}#t;build(t,e,s){let i=e.queryKey,n=e.queryHash??(0,a.Rm)(i,e),u=this.get(n);return u||(u=new r.A({cache:this,queryKey:i,queryHash:n,options:t.defaultQueryOptions(e),state:s,defaultOptions:t.getQueryDefaults(i)}),this.add(u)),u}add(t){this.#t.has(t.queryHash)||(this.#t.set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){let e=this.#t.get(t.queryHash);e&&(t.destroy(),e===t&&this.#t.delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){n.V.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return this.#t.get(t)}getAll(){return[...this.#t.values()]}find(t){let e={exact:!0,...t};return this.getAll().find(t=>(0,a._x)(e,t))}findAll(t={}){let e=this.getAll();return Object.keys(t).length>0?e.filter(e=>(0,a._x)(t,e)):e}notify(t){n.V.batch(()=>{this.listeners.forEach(e=>{e(t)})})}onFocus(){n.V.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){n.V.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},h=s(2812),l=class extends u.l{constructor(t={}){super(),this.config=t,this.#e=new Map,this.#s=Date.now()}#e;#s;build(t,e,s){let i=new h.m({mutationCache:this,mutationId:++this.#s,options:t.defaultMutationOptions(e),state:s});return this.add(i),i}add(t){let e=c(t),s=this.#e.get(e)??[];s.push(t),this.#e.set(e,s),this.notify({type:"added",mutation:t})}remove(t){let e=c(t);if(this.#e.has(e)){let s=this.#e.get(e)?.filter(e=>e!==t);s&&(0===s.length?this.#e.delete(e):this.#e.set(e,s))}this.notify({type:"removed",mutation:t})}canRun(t){let e=this.#e.get(c(t))?.find(t=>"pending"===t.state.status);return!e||e===t}runNext(t){let e=this.#e.get(c(t))?.find(e=>e!==t&&e.state.isPaused);return e?.continue()??Promise.resolve()}clear(){n.V.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}getAll(){return[...this.#e.values()].flat()}find(t){let e={exact:!0,...t};return this.getAll().find(t=>(0,a.X7)(e,t))}findAll(t={}){return this.getAll().filter(e=>(0,a.X7)(t,e))}notify(t){n.V.batch(()=>{this.listeners.forEach(e=>{e(t)})})}resumePausedMutations(){let t=this.getAll().filter(t=>t.state.isPaused);return n.V.batch(()=>Promise.all(t.map(t=>t.continue().catch(a.ZT))))}};function c(t){return t.options.scope?.id??String(t.mutationId)}var d=s(4939),f=s(9937);function y(t,{pages:e,pageParams:s}){let i=e.length-1;return e.length>0?t.getNextPageParam(e[i],e,s[i],s):void 0}var m=class{#i;#a;#r;#n;#u;#o;#h;#l;constructor(t={}){this.#i=t.queryCache||new o,this.#a=t.mutationCache||new l,this.#r=t.defaultOptions||{},this.#n=new Map,this.#u=new Map,this.#o=0}mount(){this.#o++,1===this.#o&&(this.#h=d.j.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#i.onFocus())}),this.#l=f.N.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#i.onOnline())}))}unmount(){this.#o--,0===this.#o&&(this.#h?.(),this.#h=void 0,this.#l?.(),this.#l=void 0)}isFetching(t){return this.#i.findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return this.#a.findAll({...t,status:"pending"}).length}getQueryData(t){let e=this.defaultQueryOptions({queryKey:t});return this.#i.get(e.queryHash)?.state.data}ensureQueryData(t){let e=this.getQueryData(t.queryKey);if(void 0===e)return this.fetchQuery(t);{let s=this.defaultQueryOptions(t),i=this.#i.build(this,s);return t.revalidateIfStale&&i.isStaleByTime((0,a.KC)(s.staleTime,i))&&this.prefetchQuery(s),Promise.resolve(e)}}getQueriesData(t){return this.#i.findAll(t).map(({queryKey:t,state:e})=>[t,e.data])}setQueryData(t,e,s){let i=this.defaultQueryOptions({queryKey:t}),r=this.#i.get(i.queryHash),n=r?.state.data,u=(0,a.SE)(e,n);if(void 0!==u)return this.#i.build(this,i).setData(u,{...s,manual:!0})}setQueriesData(t,e,s){return n.V.batch(()=>this.#i.findAll(t).map(({queryKey:t})=>[t,this.setQueryData(t,e,s)]))}getQueryState(t){let e=this.defaultQueryOptions({queryKey:t});return this.#i.get(e.queryHash)?.state}removeQueries(t){let e=this.#i;n.V.batch(()=>{e.findAll(t).forEach(t=>{e.remove(t)})})}resetQueries(t,e){let s=this.#i,i={type:"active",...t};return n.V.batch(()=>(s.findAll(t).forEach(t=>{t.reset()}),this.refetchQueries(i,e)))}cancelQueries(t={},e={}){let s={revert:!0,...e};return Promise.all(n.V.batch(()=>this.#i.findAll(t).map(t=>t.cancel(s)))).then(a.ZT).catch(a.ZT)}invalidateQueries(t={},e={}){return n.V.batch(()=>{if(this.#i.findAll(t).forEach(t=>{t.invalidate()}),"none"===t.refetchType)return Promise.resolve();let s={...t,type:t.refetchType??t.type??"active"};return this.refetchQueries(s,e)})}refetchQueries(t={},e){let s={...e,cancelRefetch:e?.cancelRefetch??!0};return Promise.all(n.V.batch(()=>this.#i.findAll(t).filter(t=>!t.isDisabled()).map(t=>{let e=t.fetch(void 0,s);return s.throwOnError||(e=e.catch(a.ZT)),"paused"===t.state.fetchStatus?Promise.resolve():e}))).then(a.ZT)}fetchQuery(t){let e=this.defaultQueryOptions(t);void 0===e.retry&&(e.retry=!1);let s=this.#i.build(this,e);return s.isStaleByTime((0,a.KC)(e.staleTime,s))?s.fetch(e):Promise.resolve(s.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(a.ZT).catch(a.ZT)}fetchInfiniteQuery(t){var e;return t.behavior=(e=t.pages,{onFetch:(t,s)=>{let i=async()=>{let s;let i=t.options,r=t.fetchOptions?.meta?.fetchMore?.direction,n=t.state.data?.pages||[],u=t.state.data?.pageParams||[],o=!1,h=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(t.signal.aborted?o=!0:t.signal.addEventListener("abort",()=>{o=!0}),t.signal)})},l=(0,a.cG)(t.options,t.fetchOptions),c=async(e,s,i)=>{if(o)return Promise.reject();if(null==s&&e.pages.length)return Promise.resolve(e);let r={queryKey:t.queryKey,pageParam:s,direction:i?"backward":"forward",meta:t.options.meta};h(r);let n=await l(r),{maxPages:u}=t.options,c=i?a.Ht:a.VX;return{pages:c(e.pages,n,u),pageParams:c(e.pageParams,s,u)}};if(r&&n.length){let t="backward"===r,e={pages:n,pageParams:u},a=(t?function(t,{pages:e,pageParams:s}){return e.length>0?t.getPreviousPageParam?.(e[0],e,s[0],s):void 0}:y)(i,e);s=await c(e,a,t)}else{s=await c({pages:[],pageParams:[]},u[0]??i.initialPageParam);let t=e??n.length;for(let e=1;e<t;e++){let t=y(i,s);if(null==t)break;s=await c(s,t)}}return s};t.options.persister?t.fetchFn=()=>t.options.persister?.(i,{queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},s):t.fetchFn=i}}),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(a.ZT).catch(a.ZT)}resumePausedMutations(){return f.N.isOnline()?this.#a.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#i}getMutationCache(){return this.#a}getDefaultOptions(){return this.#r}setDefaultOptions(t){this.#r=t}setQueryDefaults(t,e){this.#n.set((0,a.Ym)(t),{queryKey:t,defaultOptions:e})}getQueryDefaults(t){let e=[...this.#n.values()],s={};return e.forEach(e=>{(0,a.to)(t,e.queryKey)&&(s={...s,...e.defaultOptions})}),s}setMutationDefaults(t,e){this.#u.set((0,a.Ym)(t),{mutationKey:t,defaultOptions:e})}getMutationDefaults(t){let e=[...this.#u.values()],s={};return e.forEach(e=>{(0,a.to)(t,e.mutationKey)&&(s={...s,...e.defaultOptions})}),s}defaultQueryOptions(t){if(t._defaulted)return t;let e={...this.#r.queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return e.queryHash||(e.queryHash=(0,a.Rm)(e.queryKey,e)),void 0===e.refetchOnReconnect&&(e.refetchOnReconnect="always"!==e.networkMode),void 0===e.throwOnError&&(e.throwOnError=!!e.suspense),!e.networkMode&&e.persister&&(e.networkMode="offlineFirst"),!0!==e.enabled&&e.queryFn===a.CN&&(e.enabled=!1),e}defaultMutationOptions(t){return t?._defaulted?t:{...this.#r.mutations,...t?.mutationKey&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){this.#i.clear(),this.#a.clear()}},p=s(3191),g=s(2265),b=t=>{let{children:e}=t,[s]=(0,g.useState)(()=>new m);return(0,i.jsx)(p.aH,{client:s,children:e})}},8877:function(){},2394:function(t){t.exports={style:{fontFamily:"'__Open_Sans_0bafb9', '__Open_Sans_Fallback_0bafb9'",fontStyle:"normal"},className:"__className_0bafb9"}},2445:function(t){t.exports={style:{fontFamily:"'__Roboto_8e1270', '__Roboto_Fallback_8e1270'",fontWeight:400,fontStyle:"normal"},className:"__className_8e1270"}},2812:function(t,e,s){"use strict";s.d(e,{R:function(){return u},m:function(){return n}});var i=s(9948),a=s(3494),r=s(924),n=class extends a.F{#c;#a;#d;constructor(t){super(),this.mutationId=t.mutationId,this.#a=t.mutationCache,this.#c=[],this.state=t.state||u(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#c.includes(t)||(this.#c.push(t),this.clearGcTimeout(),this.#a.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#c=this.#c.filter(e=>e!==t),this.scheduleGc(),this.#a.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#c.length||("pending"===this.state.status?this.scheduleGc():this.#a.remove(this))}continue(){return this.#d?.continue()??this.execute(this.state.variables)}async execute(t){this.#d=(0,r.Mz)({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(Error("No mutationFn found")),onFail:(t,e)=>{this.#f({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#f({type:"pause"})},onContinue:()=>{this.#f({type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#a.canRun(this)});let e="pending"===this.state.status,s=!this.#d.canStart();try{if(!e){this.#f({type:"pending",variables:t,isPaused:s}),await this.#a.config.onMutate?.(t,this);let e=await this.options.onMutate?.(t);e!==this.state.context&&this.#f({type:"pending",context:e,variables:t,isPaused:s})}let i=await this.#d.start();return await this.#a.config.onSuccess?.(i,t,this.state.context,this),await this.options.onSuccess?.(i,t,this.state.context),await this.#a.config.onSettled?.(i,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(i,null,t,this.state.context),this.#f({type:"success",data:i}),i}catch(e){try{throw await this.#a.config.onError?.(e,t,this.state.context,this),await this.options.onError?.(e,t,this.state.context),await this.#a.config.onSettled?.(void 0,e,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,e,t,this.state.context),e}finally{this.#f({type:"error",error:e})}}finally{this.#a.runNext(this)}}#f(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),i.V.batch(()=>{this.#c.forEach(e=>{e.onMutationUpdate(t)}),this.#a.notify({mutation:this,type:"updated",action:t})})}};function u(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}}},function(t){t.O(0,[90,336,971,23,744],function(){return t(t.s=739)}),_N_E=t.O()}]);