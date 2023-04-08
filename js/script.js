let totB=document.querySelector("#totB")
let palco=document.querySelector(".palco")
const btnRe=document.querySelector("#btnRe")
const btnIn=document.querySelector("#btnIn")

let larg_palco=palco.offsetWidth
let altu_palco=palco.offsetHeight

let array_bolas=[]
let numBola=0

class Bolas{
    constructor(array_b, plc){
        this.tam=Math.floor(Math.random()*10)+30
        this.cR=Math.floor(Math.random()*255)
        this.cG=Math.floor(Math.random()*255)
        this.cB=Math.floor(Math.random()*255)
        this.pX=Math.floor(Math.random()*larg_palco-this.tam)
        this.pY=Math.floor(Math.random()*altu_palco-this.tam)
        this.array_b=array_b
        this.plc=plc

        this.velX=Math.floor(Math.random()*2)+2
        this.vely=Math.floor(Math.random()*2)+2
        this.dirX=Math.random()*10 > 5?1:-1
        this.dirY=Math.random()*10 > 5?1:-1
        this.id=Date.now()+"_"+Math.floor(Math.random()*9999)
        this.Desenhar()
        this.bAtual=document.getElementById(this.id)
        this.controle=setInterval(this.Controlar,15)
        numBola++
    }
    Desenhar(){
        let newDiv=document.createElement("div")
        newDiv.setAttribute("id",this.id)
        newDiv.setAttribute("class","bola")

        newDiv.setAttribute("style",`left:${this.pX}px; top:${this.pY}px; width: ${this.tam}px; height: ${this.tam}px; background-color:rgb(${this.cR},${this.cG},${this.cB});`)
        
        newDiv.addEventListener("mousemove",()=>{
            this.Remover()
        })

        palco.appendChild(newDiv)
    }
    controle_bordas=()=>{
        if(this.tam+this.pX >= larg_palco){
            this.dirX = -1
        } else if(this.pX <= 0){
            this.dirX = 1
        }
        if(this.tam+this.pY >= altu_palco){
            this.dirY = -1
        } else if(this.pY <= 0){
            this.dirY = 1
        }
    }
    Controlar=()=>{
        this.controle_bordas()
        this.pX+=this.dirX * this.velX
        this.pY+=this.dirY * this.vely
        this.bAtual.setAttribute("style",`left:${this.pX}px; top:${this.pY}px; width: ${this.tam}px; height: ${this.tam}px; background-color:rgb(${this.cR},${this.cG},${this.cB});`)
        if(this.pX > larg_palco || this.pY > altu_palco){
            this.Remover()
        }
    }
    Remover=()=>{
        clearInterval(this.controle)
        array_bolas=array_bolas.filter((cadaBola)=>{
            if(cadaBola.id != this.id){
                return cadaBola
            }
        })
        this.bAtual.remove()
        numBola--
        totB.value=numBola
    }
}

btnIn.addEventListener("click",()=>{
    let qntD=document.querySelector("#qntD")
    let qnt_d=qntD.value

    if(qnt_d < 5 || qnt_d > 30){
        alert("[ ERRO ] Leia as instruções e tente novamente.")
        qntD.focus()
    } else{
        for(let i=0;i<qnt_d;i++){
            array_bolas.push(new Bolas(array_bolas, palco))
        }
        totB.value=numBola
        qntD.value=0
    }
})
btnRe.addEventListener("click",()=>{
    array_bolas.forEach((cadaBola=>{
        cadaBola.Remover()
    }))
    totB.value=0
})

window.addEventListener("resize",()=>{
    larg_palco=palco.offsetWidth
    altu_palco=palco.offsetHeight
})