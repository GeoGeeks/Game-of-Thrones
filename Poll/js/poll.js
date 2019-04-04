
var familia = "";
var mongoid = "";
var votosahora;
var ipersona;
/*var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
findIP.then(ip => ipersona = ip).catch(e => console.error(e))
console.log("ip de votante: ", ipersona);*/

function escogido(id){
    console.log(id);
    switch(id){
        case('temporada1'):
            familia = '1';
            mongoid = '5ca57a2f95ca8f289c771727';
            break;
        case('temporada2'):
            familia = '2';
            mongoid = '5ca57a3995ca8f289c771728';
            break;
        case('temporada3'):
            familia = '3';
            mongoid = '5ca57a4395ca8f289c771729';
            break;
        case('temporada4'):
            familia = '4';
            mongoid = '5ca57a4a95ca8f289c77172a';
            break;
        case('temporada5'):
            familia = '5';
            mongoid = '5ca57a5195ca8f289c77172b';
            break;
        case('temporada6'):
            familia = '6';
            mongoid = '5ca57a5995ca8f289c77172c';
            break;
        case('temporada7'):
            familia = '7';
            mongoid = '5ca57a6195ca8f289c77172d';
            break;

    }
    console.log("temporada:  ", familia)
    console.log("id:", mongoid)
    /*var findIP = new Promise(r=>{var w=window,a=new (w.RTCPeerConnection||w.mozRTCPeerConnection||w.webkitRTCPeerConnection)({iceServers:[]}),b=()=>{};a.createDataChannel("");a.createOffer(c=>a.setLocalDescription(c,b,b),b);a.onicecandidate=c=>{try{c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)}catch(e){}}})
    findIP.then(ip => ipersona = ip).catch(e => console.error(e))
    console.log("ip de votante: ", ipersona);*/
}


function enviarVoto(){
    console.log("se ejecuta el envio de voto");
    var headers = {
        "Content-Type": "application/json",
        "Allow": "*"
    };


    var ip = "ipDePrueba";



    axios.get('https://cors-anywhere.herokuapp.com/geoapps.esri.co:80/RestDeDaniel/api/votos/'+mongoid+'/?format=json','',{headers: headers})
    .then(function(response){
        var votosact = response.data.votos;
        console.log('votosact= ', votosact);
    
        var data = {
            votos: votosact + 1
        };
    
        var test = JSON.stringify(data);
        return axios.put('https://cors-anywhere.herokuapp.com/geoapps.esri.co:80/RestDeDaniel/api/votos/' + mongoid +'/',test,{headers: headers});
    })
    .then(function(response){
        console.log("voto agregado");
        console.log(response);
        location.reload();
    })
    .catch(function (error){
        console.log("error");
        console.log(error);
    });
}
