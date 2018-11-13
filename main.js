$(document).ready(function(){
    function testeGrafo() {
        insereVertice('v1');
        insereVertice('v2');
        insereVertice('v3');
        insereVertice('v4');
        insereAresta('v1','v2');
        insereAresta('v2','v3');
        insereAresta('v2','v4');
        insereAresta('v3','v4');
        insereAresta('v4','v3');
        insereAresta('v3','v5');
        insereAresta('v4','v5');
        insereVertice('v5');
        insereAresta('v3','v5');
        insereAresta('v4','v5');
        insereAresta('v5','v1');
        exibeGrafo();
        removeVertice('v5');
        removeAresta('v1','v6');
        removeAresta('v1','v5');
        removeAresta('v5','v1');
        removeAresta('v2','v1');
        removeAresta('v1','v2');
        adjacentesTodos('v3');
        adjacentes('v4','v3');
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
            for (let [k,para] of Object.entries(value['divergePara'])) {
                // console.log(key, '->' ,para);
                $('.arestas').append('<option value="' + key + '&rarr;' + para + '">' + key + '&rarr;' + para + '</option>');
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
        var resp = insereVertice($('#add_vertice').val());
        $('#add_vertice').val('').focus();
        atualiza();
        respAlerta($(this), resp);
    });

    $('#button-rem_vertice').on('click', function () {
        var resp = removeVertice($('#rem_vertice').val());
        atualiza();
        respAlerta($(this), resp);
    });

    $('#button-add_aresta').on('click', function () {
        var resp = insereAresta($('#add_aresta_1').val(), $('#add_aresta_2').val());
        atualiza();
        respAlerta($(this), resp);
    });
    
    $('#button-rem_aresta').on('click', function () {
        v = $('#rem_aresta').val().split('→');
        var resp = removeAresta(v[0], v[1]);
        atualiza();
        respAlerta($(this), resp);
    });

    $('#button-verif_ligacao').on('click', function () {
        var v1 = $('#verif_ligacao_1').val();
        var v2 = $('#verif_ligacao_2').val();
        var resp = adjacentes(v1, v2);
        // atualiza();
        // respAlerta($(this), resp);
        $('.modal-title').html('Adjacencia entre "' + v1 + '" e "' + v2 + '"');
        var body = '<h6><b>' + resp.message + '</b></h6>';
        for (const l of resp.data.ligacoes) {
            body += '<p>' + l.origem + '→' + l.destino + '</p>';
        }
        $('.modal-body').html(body);
        $('#modal').modal('show');
    });

    $('#button-viz_adjacentes').on('click', function () {
        var v = $('#viz_adjacentes').val();
        var resp = adjacentesTodos(v);
        // atualiza();
        // respAlerta($(this), resp);
        $('.modal-title').html('Adjacentes ao vértice "' + v + '"');
        var body = '<h6><b>' + resp.message + '</b></h6>';
        for (const c of resp.data.convergeDe) {
            body += '<p><b>' + c + '</b> (' + c + '→' + v + ')</p>';
        }
        for (const d of resp.data.divergePara) {
            body += '<p><b>' + d + '</b> (' + v + '→' + d + ')</p>';
        }
        $('.modal-body').html(body);
        $('#modal').modal('show');
    });

    $('#button-calc_grau').on('click', function () {
        var v = $('#calc_grau').val();
        var resp = grau(v);
        // atualiza();
        // respAlerta($(this), resp);
        $('.modal-title').html('Grau do vértice "' + v + '"');
        var body = '<h6><b>' + resp.message + '</b></h6>';
        body += '<p>Grau de saida: ' + resp.data.grau_saida + '</p>';
        body += '<p>Grau de entrada: ' + resp.data.grau_entrada + '</p>';
        $('.modal-body').html(body);
        $('#modal').modal('show');
    });

    // testeGrafo();
    atualiza();
    $('.alert').hide();
});