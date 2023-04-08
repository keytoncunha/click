const instru=document.querySelector("#span_instru")
const visib=document.querySelector("#visib")
let div_instru=document.querySelector("#div_instru")

let larg_tela=window.innerWidth
visib.addEventListener('click',()=>{
    div_instru.setAttribute('class','menu_none')
})
instru.addEventListener('click',()=>{
    div_instru.classList.remove('menu_none')
})

window.addEventListener("mousemove",()=>{
    div_instru.classList.add("menu_none")
})
div_instru.addEventListener("mousemove",(evt)=>{
    evt.stopPropagation()
})