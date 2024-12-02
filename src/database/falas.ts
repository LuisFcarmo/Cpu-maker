type falas = {
    fala:string,
    explicado:string,
}

const falas0:falas ={
    fala: 
    `
    Olá, seja bem vindo ao CPU-Maker.

    Meu intuito é te ajudar a escolher uma CPU que melhor se adapte às suas necessidades.Basta escolher as configurações desejadas e eu irei buscar a melhor opção de CPU no mercado de acordo com as suas prefências.

    Vamos começar?
    `,
    explicado: ""
}  

const falas1:falas ={
    fala: "Qual o consumo de energia da CPU?",
    explicado: "Quanto a CPU irá consumir de energia elétrica da sua residência."
}  

const falas2:falas ={
    fala: "Qual o desempenho?",
    explicado: "Quão eficiente será a CPU para executar tarefas difíceis."
}  

const falas3:falas ={
    fala: "Qual o custo?",
    explicado: "Quanto você deseja investir para comprar a CPU."
}  

const falas4:falas ={
    fala: "Qual vai ser o tipo de aplicação?",
    explicado: "Para qual finalidade a CPU será usada: estudos, edição de vídeos, jogar jogos, etc"
}  

const falas5:falas ={
    fala: "Verifique as respostas:\n **Consumo:** $\n **Desempenho:** $\n **Custo:** $\n **Aplicação:** $",
    explicado: "Preencha todos os campos para poder prosseguir."
}  

const falas6:falas ={
    fala: "",
    explicado: ""
} 

const todasFalas = [falas0,falas1,falas2,falas3,falas4,falas5,falas6];

export function pegarFrases(id: number){
    if (id < 0 || id >= todasFalas.length) {
        id=0;
    }
    return todasFalas[id]; // Retorna o conjunto de cores correspondente ao id
}