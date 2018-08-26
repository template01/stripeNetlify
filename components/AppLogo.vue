<template>
<div class="">

  <button id="customButton">Purchase</button>
  <div id="messageBox">
    <h2></h2>
  </div>
</div>
</template>
<script>

import uuid from 'uuid/v4';

export default {
  mounted() {


    const amount = 1000;
    const $messageBox = document.getElementById('messageBox');
    const $button = document.querySelector('#customButton');

    function resetButtonText() {
      $button.innerHTML = 'Click to Buy! <strong>$10</strong>';
    }

    const handler = StripeCheckout.configure({
      key: 'pk_test_GaZndeCzRWqKRqAEKMqObMnK',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      closed: function() {
        resetButtonText();
      },
      token: function(token) {

        fetch(`http://localhost:9000/purchase`, {
            method: 'POST',
            body: JSON.stringify({
              token,
              amount,
              idempotency_key: uuid()
            }),
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          })
          .then(res => res.json())
          .catch(error => console.error(error))
          .then(response => {

            resetButtonText();

            let message = typeof response === 'object' && response.status === 'succeeded' ?
              'Charge was successful!' :
              'Charge failed.'
            $messageBox.querySelector('h2').innerHTML = message;

            console.log(response);
          });
      }
    });

    $button.addEventListener('click', () => {

      setTimeout(() => {
        $button.innerHTML = 'Waiting for response...';
      }, 500);

      handler.open({
        amount,
        name: 'Test Shop',
        description: 'A Fantastic New Widget'
      });
    });


  }
}
</script>
<style>

</style>
