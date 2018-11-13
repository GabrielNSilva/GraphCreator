class Grafo {
    constructor(nome){
        this.nome = nome;
        this.nodes = [];
    }

    insereVertice(nome){
        this.nodes.push(new Node(nome));
    }

    removeVertice(nome){
        this.nodes.forEach(no => {
            if (no.nome == nome) {
                var index = arr.indexOf(no);
                this.nodes.splice(index, 1);
            }
        });
    }
}