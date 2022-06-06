$(document).ready(() => {
  const mainUrl = window.location.href.split("/home")[0];
  const customizeUrl = `${mainUrl}/wish/customize.json`;
  fetch(customizeUrl)
    .then(res=>res.json())
    .then(data=>{
      const arr = Object.entries(data);
      window.dataArr = arr;
      const fields = $(".fields");
      arr.forEach(([key, value])=>{
        fields.append(`
        <div class="mt-3 mb-3 form-floating">
            <input 
              class="form-control" 
              type="text"
              id="${key}" 
              value="${value}"
              placeholder="${key}" />
              <label for="${key}">${key}</label>
        </div>`)
      })
    })
    .catch(err=>console.log(err));
    
  const getUrl = () => {
    let url = `${mainUrl}/wish?`
    window.dataArr.forEach(([key, value])=>{
       const val = $(`#${key}`).val();
       if (val!==value) url+= `&${key}=${encodeURIComponent(val)}`;
    })
    url = url.replace("?&", "?");
    return url;
  }
  const copyToClipboard = (text) => {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
  };

  $("#form").submit((e) => e.preventDefault());
  
  $("#button-copy").click( () => {
    const url =  getUrl();
    if (url) {
      copyToClipboard(url);
    }
  });
  
  $("#button-shorten").click(async() => {
    const url =  getUrl();
    let response = "";
    if (url) {
        response = await (await fetch(url)).text();
        if (response.startsWith("https://")) {
            copyToClipboard(response);
            const win = window.open(response, "_blank");
            win.focus();
        }
        else {
            response.startsWith("<")
              ? alert("Image shortener not available")
              : alert(response)
        }
    }
  });
  
  $("#button-url").click(() => {
    const url =  getUrl();
    if (url) {
      const win = window.open(url, "_blank");
      win.focus();
    }
  });
});
