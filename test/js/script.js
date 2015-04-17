window.onload = function(){

    var list = ['much clever', 'so exciting', 'how thoughtful','like!'];

    _D('#someId')
        .add(_D('ul')
        .add(_D('li').put( _D('h1').put('WOW!') ))
        .list(list, 'li')
        );

    _D('.someClass').put('div with class');
};