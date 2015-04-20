window.onload = function(){
    var list = ['much clever', 'so exciting', 'how thoughtful','like!'];

    _D('#someId')
      .add(_D('div')
          .add(_D('li').put( _D('h1').put('WOW!') ))
          .loop(list, 'li')
    );

    _D('div.inner .show').css({
        'background-color':'rgba(0,0,0,0.1)',
        'font-size': '10px'
    });
};