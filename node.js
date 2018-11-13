class Node {
    constructor(nome){
        this.nome = nome;
        this.diverge = []; // que sai desse no
        this.converge = []; // que entra nesse no
    }

    divergePara(no) {
        this.diverge.push(no);
    }

    convergeDe(no){
        this.converge.push(no);
    }
}