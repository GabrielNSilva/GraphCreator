var grafo = {};

function insereVertice(v) {
    grafo[v] = {
        'convergeDe': [],
        'divergePara': []
    };
    console.log('Vertice ' + v + ' inserido.');
    return {
        'success': true,
        'message': 'Vertice ' + v + ' inserido.'
    };
}

function removeVertice(v) {
    if (grafo[v] != undefined) {
        console.log('Removendo arestas que convergem para ' + v + '.');
        while (grafo[v].convergeDe.length) {
            c = grafo[v].convergeDe.pop();
            var i_v = grafo[c].divergePara.indexOf(v);
            if (i_v != -1) {
                grafo[c].divergePara.splice(i_v, 1); // v <-- c
                console.log('Removida aresta ' + c + '→' + v);
            }
        }

        console.log('Removendo arestas que divergem de ' + v + '.');
        while (grafo[v].divergePara.length) {
            d = grafo[v].divergePara.pop();
            // console.log(d);
            var i_v = grafo[d].convergeDe.indexOf(v);
            if (i_v != -1) {
                grafo[d].convergeDe.splice(i_v, 1); // v <-- d
                console.log('Removida aresta ' + d + '→' + v);
            }
        }

        delete grafo[v];
        console.log('Vertice ' + v + ' removido.');
        return {
            'success': true,
            'message': 'Vertice ' + v + ' removido.'
        };
    } else {
        console.log('Não existe o vertice informado!');
        return {
            'success': false,
            'error': 'Não existe o vertice informado!'
        };
    }
}

function insereAresta(v1, v2) {
    if (grafo[v1] != undefined && grafo[v2] != undefined) {
        grafo[v1].divergePara.push(v2); // v1 --> v2
        grafo[v2].convergeDe.push(v1); // v2 <-- v1
        console.log('Aresta ' + v1 + '→' + v2 + ' inserida.');
        return {
            'success': true,
            'message': 'Aresta ' + v1 + '→' + v2 + ' inserida.'
        };
    } else {
        console.log('Não existe algum vertice informado!');
        return {
            'success': false,
            'error': 'Não existe algum vertice informado!'
        };
    }
}

function removeAresta(v1, v2) {
    if (grafo[v1] != undefined && grafo[v2] != undefined) {
        var i_v2 = grafo[v1].divergePara.indexOf(v2);
        var i_v1 = grafo[v2].convergeDe.indexOf(v1);
        if (i_v1 != -1 && i_v2 != -1) {
            grafo[v1].divergePara.splice(i_v2, 1); // v1 --> v2
            grafo[v2].convergeDe.splice(i_v1, 1); // v2 <-- v1
            console.log('Aresta ' + v1 + '→' + v2 + ' removida.');
            return {
                'success': true,
                'message': 'Aresta ' + v1 + '→' + v2 + ' removida.'
            };
        } else {
            console.log('Aresta ' + v1 + '→' + v2 + ' não existe!');
            return {
                'success': false,
                'error': 'Aresta ' + v1 + '→' + v2 + ' não existe!'
            };
        }
    } else {
        console.log('Não existe algum vertice informado!');
        return {
            'success': false,
            'error': 'Não existe algum vertice informado!'
        };
    }
}

function exibeGrafo() {
    console.log(grafo);
    console.log(JSON.stringify(grafo));
}

function adjacentesTodos(v) {
    if (grafo[v] != undefined) {
        console.log('Adjacentes à ' + v);
        for (const viz of grafo[v].divergePara) {
            console.log('\t' + v + '→' + viz);
        }
        for (const viz of grafo[v].convergeDe) {
            console.log('\t' + v + '←' + viz);
        }

        if (grafo[v].divergePara.length != 0 || grafo[v].convergeDe.length != 0) {
            var msg = '';
        } else {
            var msg = 'Vertice sem adjacentes!';
        }

        return {
            'success': true,
            'message': msg,
            'data': {
                'divergePara': grafo[v].divergePara,
                'convergeDe': grafo[v].convergeDe
            }
        };
    } else {
        console.log('Não existe o vertice informado!');
        return {
            'success': false,
            'error': 'Não existe o vertice informado!'
        };
    }
}

function adjacentes(v1, v2) {
    if (grafo[v1] != undefined && grafo[v2] != undefined) {
        if (grafo[v1].divergePara.indexOf(v2) != -1 || grafo[v2].divergePara.indexOf(v1) != -1) {
            console.log('Os vertices estão ligados:');
            var ligacoes = [];
            if (grafo[v1].divergePara.indexOf(v2) != -1) {
                console.log('\t' + v1 + '→' + v2);
                ligacoes.push({
                    'origem': v1,
                    'destino': v2
                });
            }
            if (grafo[v2].divergePara.indexOf(v1) != -1) {
                console.log('\t' + v2 + '→' + v1);
                ligacoes.push({
                    'origem': v2,
                    'destino': v1
                });
            }
            return {
                'success': true,
                'message': 'Os vertices estão ligados:',
                'data': {
                    'ligacoes': ligacoes
                }
            };
        } else {
            console.log('Não existe aresta entre os vertices informados!');
            return {
                'success': true,
                'message': 'Não existe aresta entre os vertices informados!',
                'data': {
                    'ligacoes': []
                }
            };
        }
    } else {
        console.log('Não existe algum vertice informado!');
        return {
            'success': false,
            'error': 'Não existe algum vertice informado!'
        };
    }
}

function grau(v) {
    if (grafo[v] != undefined) {
        var gs = grafo[v].divergePara.length;
        var ge = grafo[v].convergeDe.length;
        var msg = '';
        
        if (gs == 0 && ge != 0)
            msg = 'Vertice sumidouro';
        else if (gs != 0 && ge == 0)
            msg = 'Vertice fonte';

        console.log(msg);
        console.log('Grau de saida:   ' + gs);
        console.log('Grau de entrada: ' + ge);

        return {
            'success': true,
            'message': msg,
            'data': {
                'grau_saida': gs,
                'grau_entrada': ge
            }
        };
    } else {
        console.log('Não existe o vertice informado!');
        return {
            'success': false,
            'error': 'Não existe o vertice informado!'
        };
    }
}

function prim(){

}

function dijkstra(){
    var caminho = [];
    var tabela = {};
}