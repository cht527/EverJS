var ModalHelper = (function(bodyCls) {
  var scrollTop;
  return {
    afterOpen: function() {
      if(document.scrollingElement){
        scrollTop = document.scrollingElement.scrollTop;
      } else {
        scrollTop = document.body.scrollTop;
      }
      document.body.classList.add(bodyCls);
      document.body.style.top = -scrollTop + 'px';
    },
    beforeClose: function() {
      if (document.scrollingElement) {
        document.body.classList.remove(bodyCls);
        document.scrollingElement.scrollTop = scrollTop;
      } else {
        document.body.classList.remove(bodyCls);
        document.body.scrollTop = scrollTop;
      }

      // scrollTop lost after set position:fixed, restore it back.
    }
  };
})('modal-open');