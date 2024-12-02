const escolha0:string[] =  ["Começar"]

const escolha1:string[] = ["Baixo","Medio","Alto"]
const escolha2:string[] =  ["Baixo","Medio","Alto"]
const escolha3:string[] =  ["Acessível","Mediano","Alto investimento"]

const escolha4:string[] =  [""]

const escolha5:string[] =  ["Resultado"]
const escolha6:string[] =  ["Fazer Novamente"]

const todasEscolhas = [escolha0,escolha1,escolha2,escolha3,escolha4,escolha5,escolha6];

export function pegarFrases(id: number){
    if (id < 0 || id >= todasEscolhas.length) {
        id=0;
    }
    return todasEscolhas[id]; // Retorna o conjunto de cores correspondente ao id
}