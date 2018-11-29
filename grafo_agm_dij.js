var grafo = {};
var agm = {};

function insereVertice(g, v) {
    g[v] = {};
    console.log('Vertice ' + v + ' inserido.');
    return {
        'success': true,
        'message': 'Vertice ' + v + ' inserido.'
    };
}

function removeVertice(g, v) {
    if (g[v] != undefined) {
        console.log('Removendo arestas dos adjacentes para ' + v + '.');
        keys = Object.keys(g[v]);
        keys.forEach(k => {
            delete g[k][v];
        });

        delete g[v];
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

function insereAresta(g, v1, v2, p) {
    if (g[v1] != undefined && g[v2] != undefined) {
        g[v1][v2] = p;
        g[v2][v1] = p;
        console.log('Aresta ' + v1 + '—' + p + '—' + v2 + ' inserida.');
        return {
            'success': true,
            'message': 'Aresta ' + v1 + '—' + p + '—' + v2 + ' inserida.'
        };
    } else {
        console.log('Não existe algum vertice informado!');
        return {
            'success': false,
            'error': 'Não existe algum vertice informado!'
        };
    }
}

function removeAresta(g, v1, v2) {
    if (g[v1] != undefined && g[v2] != undefined) {
        if (g[v1][v2] != undefined && g[v2][v1] != undefined) {
            p = g[v1][v2];
            delete g[v1][v2];
            delete g[v2][v1];
            if (g[v1][v2] == undefined && g[v2][v1] == undefined){
                console.log('Aresta ' + v1 + '—' + p + '—' + v2 + ' removida.');
                return {
                    'success': true,
                    'message': 'Aresta ' + v1 + '—' + p + '—' + v2 + ' removida.'
                };
            }
        } else {
            console.log('Aresta ' + v1 + '—?—' + v2 + ' não existe!');
            return {
                'success': false,
                'error': 'Aresta ' + v1 + '—?—' + v2 + ' não existe!'
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

function prim(grf) {
    console.log('GERANDO AGM....');
    let g = $.extend(true, {}, grf);
    agm = {};

    keys = Object.keys(g);
    v = keys.pop();
    insereVertice(agm, v);
    inseridos = [v];
    console.log('Comecou pelo '+v);

    while (len(agm) < len(g)){
        console.log('Loop..................................');
        menor = null;

        console.log('Inseridos '+inseridos);
        for (x in inseridos){
            for (y, p in g[x].items()){
                console.log('Verificando '+x+'---'+p+'---'+y);
                if (menor==null || p < menor.peso)
                    menor = {'viz': x, 'vertice': y, 'peso': p};
                console.log('\tMENOR: '+menor.viz+'---'+menor.peso+'---'+menor.vertice);
            }
        }

        inseridos.append(menor.vertice);
        ins_v(agm, menor.vertice);
        ins_e(agm, menor.vertice, menor.viz, menor.peso);
        console.log('Selecionada aresta',menor.viz,'---',menor.peso,'---',menor.vertice);

        rem_e(g, menor.vertice, menor.viz);
    }
    return agm;
}

function dijkstra(g, noi, nof) {
    var caminho = [];
    var tabela = {};
    var nodes = Object.keys(g);
    for (const no in g) {
        tabela[no] = {
            'dist': null,
            'ant': null,
            'fechado': false
        }
    }
    tabela[noi]['dist'] = 0;
        
    atual = noi;
	while(atual != nof){
		console.log('ATUAL:',atual)
		for (const viz in g[atual]){
			d = tabela[atual].dist + g[atual][viz];
			console.log('\t'+viz+'='+d);
			if (tabela[viz].dist==null || d < tabela[viz].dist){
				tabela[viz].dist = d;
                tabela[viz].ant = atual;
            }
        }
		nodes.splice(nodes.indexOf(atual), 1);
		tabela[atual].fechado = true;
		
		// print_tabela(tabela);

        menor = null;
        nodes.forEach(no => {
            d = tabela[no].dist;
            if (d != null && (menor==null || d < menor.dist))
                menor = {'node': no, 'dist': d};
            console.log(menor);
        });
        atual = menor.node;
    }

	while (atual != noi){
		caminho.push(atual)
		atual = tabela[atual].ant;
    }
	caminho.push(atual);
	// caminho.reverse()

	return {'path':caminho, 'dist':tabela[nof].dist};
}