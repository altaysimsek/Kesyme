const getUserUrl = () => {
    fetch('/urlz')
  .then(response => response.json())
  .then(data => {
    let toplamTiklanma = 0;
    
    
    data.forEach(element => {
          $("#itemList").append(`
                <div class="card mb-3">
                
                    <div class="card-body">
                        <h4 >Kısaltması : <a href="${'/' + element.short}">${element.short}</a></h4>
                        <p>Orjinal url : <a href=' ${element.url}'>${element.url}</a></p> <br>
                        <p>Tıklanma sayısı : ${element.clicks}</p>
                    </div>
                </div>
          

          `)
          toplamTiklanma += element.clicks

      });
      $("#status").text(`Toplam link : ${data.length} | Toplam tıklanma : ${toplamTiklanma}`)
      $("#userName").text("Hoşgeldin ✌") 
  });
}

getUserUrl()