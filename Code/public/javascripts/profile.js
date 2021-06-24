async function createCards() {
    let main = document.getElementById('card-block');
    let user = JSON.parse(sessionStorage.getItem("conta"));
    let clientes = await $.ajax({
        url: "/API/clientes/getById/" + user.C_id,
        method: "get",
        dataType: "json"
    });
    console.log(clientes)
    for (let idx in clientes) {  
        main.innerHTML += showInformation(clientes[idx]);
    }
}

function showInformation(cliente) {
    let html = "";
        html += `<h6 class="m-b-20 p-b-5 b-b-default f-w-600">INFORMAÇÃO PESSOAL</h6>
        <div class="row">
            <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Nome</p>
                <h6 class="text-muted f-w-400">Nome</h6>
            </div>
            <div class="col-sm-22">
                <p class="m-b-10 f-w-600">Número de Estudante</p>
                <h6 class="text-muted f-w-400">${cliente.C_number}</h6>
            </div>

            <div class="col-sm-22">
                <p class="m-b-10 f-w-600">Data de Nascimento</p>
                <h6 class="text-muted f-w-400">${cliente.C_data_nasc}</h6>
            </div>
        </div>
        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">INFORMAÇÃO DE ENDEREÇO</h6>
        <div class="row">
            <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Morada</p>
                <h6 class="text-muted f-w-400">${cliente.CP_l1}, ${cliente.l2}</h6>
            </div>
            <div class="col-sm-22">
                <p class="m-b-10 f-w-600">Código Postal</p>
                <h6 class="text-muted f-w-400">${cliente.CP_4}-${cliente.CP_3}</h6>
            </div>
        </div>
        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">INFORMAÇÕES DE CONTATO</h6>
        <div class="row">
            <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Email</p>
                <h6 class="text-muted f-w-400">${cliente.C_email}</h6>
            </div>
            <div class="col-sm-22">
                <p class="m-b-10 f-w-600">Telemóvel</p>
                <h6 class="text-muted f-w-400">${cliente.C_telemovel}</h6>
            </div>
        </div>`;
    return html;
}


window.onload = () => {
    createCards();   
}

function getDate(data) {
    return data.substring(data.indexOf('T'), -1);
}