$(document).ready(function(){
    function testeGrafo() {
        insereVertice(grafo, 'v1');
        insereVertice(grafo, 'v2');
        insereVertice(grafo, 'v3');
        insereVertice(grafo, 'v4');
        insereAresta(grafo, 'v1','v2', 1+2);
        insereAresta(grafo, 'v2','v3', 2+3);
        insereAresta(grafo, 'v2','v4', 2+4);
        insereAresta(grafo, 'v3','v4', 3+4);
        insereAresta(grafo, 'v4','v3', 4+3);
        insereAresta(grafo, 'v3','v5', 3+5);
        insereAresta(grafo, 'v4','v5', 4+5);
        insereVertice(grafo, 'v5');
        insereAresta(grafo, 'v3','v5', 3+5);
        insereAresta(grafo, 'v4','v5', 4+5);
        insereAresta(grafo, 'v5','v1', 5+1);
        exibeGrafo();
        // removeVertice('v5');
        // removeAresta('v1','v6');
        // removeAresta('v1','v5');
        // removeAresta('v5','v1');
        // removeAresta('v2','v1');
        // removeAresta('v1','v2');
        // adjacentesTodos('v3');
        // adjacentes('v4','v3');
    }

    function exibeJson() {
        $('#txt_grafo').html(JSON.stringify(grafo, null, 2));
    }

    function atualizaFields() {
        $('.vertices').html('<option selected>Escolha o vertice...</option>');
        $('.arestas').html('<option selected>Escolha a aresta...</option>');
        for (let [key, value] of Object.entries(grafo)) {
            $('.vertices').append('<option value="' + key + '">' + key + '</option>');
            // console.log(key, value);
            for (let [k,p] of Object.entries(value)) {
                // console.log(key, '->' ,para);
                $('.arestas').append('<option value="' + key + '—' + p + '—' + k + '">' + key + '—' + p + '—' + k + '</option>');
            }
        }
    }

    function atualiza() {
        exibeJson();
        atualizaFields();
    }

    function respAlerta($btn, resp) {
        if (resp.success)
            $btn.closest('.form-group').find('.alert').addClass('alert-success').removeClass('alert-danger').html(resp.message).show();
        else
            $btn.closest('.form-group').find('.alert').addClass('alert-danger').removeClass('alert-success').html(resp.error).show();

        setTimeout(function () {
            $btn.closest('.form-group').find('.alert').hide();
        }, 3000);
    }

    $('#button-add_vertice').on('click', function () {
        var resp = insereVertice(grafo, $('#add_vertice').val());
        $('#add_vertice').val('').focus();
        atualiza();
        respAlerta($(this), resp);
    });

    $('#button-rem_vertice').on('click', function () {
        var resp = removeVertice(grafo, $('#rem_vertice').val());
        atualiza();
        respAlerta($(this), resp);
    });

    $('#button-add_aresta').on('click', function () {
        var resp = insereAresta(grafo, $('#add_aresta_1').val(), $('#add_aresta_2').val(), $('#add_aresta_val').val());
        atualiza();
        respAlerta($(this), resp);
    });
    
    $('#button-rem_aresta').on('click', function () {
        v = $('#rem_aresta').val().split('—');
        var resp = removeAresta(grafo, v[0], v[2]);
        atualiza();
        respAlerta($(this), resp);
    });

    $('#button-rem_aresta').on('click', function () {
        v = $('#rem_aresta').val().split('—');
        var resp = removeAresta(grafo, v[0], v[2]);
        atualiza();
        respAlerta($(this), resp);
    });

    testeGrafo();
    atualiza();
    $('.alert').hide();
});