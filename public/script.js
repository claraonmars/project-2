window.onload = function(){
    document.querySelector('#login')
        .addEventListener('click',loadLoginPage);

};


function loadLoginPage(){
  var h1 = document.createElement('h1');
      h1.innerText = 'hello';
      document.querySelector('body').appendChild( h1 );
};