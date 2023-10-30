var inputQty = document.getElementsByClassName("input-qty");
// var btnAddCart = document.querySelectorAll('.btn-buy-product button');
// var linkCart = document.getElementById('linkCart');
// var hrefCart = linkCart.getAttribute('href');
if (inputQty) {
$(inputQty).each(function() {
var $this = $(this)
qty = $this.parent().find('.is-form'),
min = Number($this.attr('min')),
max = Number($this.attr('max'))

// $(document).ready(function(){
//   $(".input-qty",this).on('keydown, keyup', function(){
//     $this.attr('value', this.value)
//     // if ((this.value < max) && ( this.value > min - 1)) {
//     //   $(btnAddCart).attr('disabled', false);
//     //   $(linkCart).attr('href', hrefCart);
//     //   $(btnAddCart).css('opacity', '1');
//     // } else {
//     //   $(btnAddCart).attr('disabled', true);
//     //   $(linkCart).removeAttr('href');
//     //   $(btnAddCart).css('opacity', '0.6');
//     // }
//     var valueInput = Number(this.value)
//     $(qty).on('click', function() {
//       if ($(this).hasClass('minus')) {
//         if (valueInput > min) valueInput -= 1
//       } else if ($(this).hasClass('plus')) {
//         var x = Number($this.val()) + 1
//         if (x <= max) valueInput += 1
//       }
//       $this.attr('value', valueInput).val(valueInput)
//     })
  
//   });
// });
              
valueInput = min
$(qty).on('click', function() {
  if ($(this).hasClass('minus')) {
    if (valueInput > min) valueInput -= 1
  } else if ($(this).hasClass('plus')) {
    var x = Number($this.val()) + 1
    if (x <= max) valueInput += 1
  }
  $this.attr('value', valueInput).val(valueInput)
})

})
}
// var inputQty = document.getElementsByClassName("input-qty");
// var variantCombinations = '{{ product.VariantCombinations | json | raw }}';
// var listVariant = JSON.parse(variantCombinations);
// var plusBtn = document.getElementsByClassName("plus");
// if (inputQty) {
//   $(inputQty).each(function() {
//     var $this = $(this)
//     $(document).ready(function(){
//       $(inputQty,this).on('keydown, keyup', function() {
//         listVariant.map(item => {
//           if(this.value >= item.Quantity) {
//             $(plusBtn, this).attr('disabled', true);
//             $(plusBtn, this).css('opacity', '0.5');
//           } else {
//             $(plusBtn, this).attr('disabled', false);
//             $(plusBtn, this).css('opacity', '1');
//           }
//         })
//         $this.attr('value', this.value)
//       })
//     });

//     qty = $this.parent().find('.is-form'),
//     min = Number($this.attr('min')),
//     max = Number($this.attr('max'))
//     if (min == 0) {
//       var valueInput = 0
//     } else valueInput = min
//     $(qty).on('click', function() {
//       if ($(this).hasClass('minus')) {
//         console.log('minus', valueInput);
//         if (valueInput > min) valueInput -= 1
//         listVariant.map(item => {
//           if(valueInput < item.Quantity) {
//             $(plusBtn, this).attr('disabled', false);
//             $(plusBtn, this).css('opacity', '1');
//           } 
//         })
//       } else if ($(this).hasClass('plus')) {
//         console.log('plus', valueInput);
//         if (valueInput <= max) valueInput += 1
//         listVariant.map(item => {
//           if(valueInput >= item.Quantity) {
//             $(plusBtn, this).attr('disabled', true);
//             $(plusBtn, this).css('opacity', '0.5');
//           }
//         })
//       }
//       $this.attr('value', valueInput).val(valueInput)
//     })
//   });
// }