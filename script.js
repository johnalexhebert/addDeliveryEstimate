
    (function(win) {
    'use strict';
    
    var listeners = [], 
    doc = win.document, 
    MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
    observer;
    
    function ready(selector, fn) {
        // Store the selector and callback to be monitored
        listeners.push({
            selector: selector,
            fn: fn
        });
        if (!observer) {
            // Watch for changes in the document
            observer = new MutationObserver(check);
            observer.observe(doc.documentElement, {
                childList: true,
                subtree: true
            });
        }
        // Check if the element is currently in the DOM
        check();
    }
        
    function check() {
        // Check the DOM for elements matching a stored selector
        for (var i = 0, len = listeners.length, listener, elements; i < len; i++) {
            listener = listeners[i];
            // Query for elements matching the specified selector
            elements = doc.querySelectorAll(listener.selector);
            for (var j = 0, jLen = elements.length, element; j < jLen; j++) {
                element = elements[j];
                // Make sure the callback isn't invoked with the 
                // same element more than once
                if (!element.ready) {
                    element.ready = true;
                    // Invoke the callback with the element
                    listener.fn.call(element, element);
                }
            }
        }
    }
    
    // Expose `ready`
    win.ready = ready;
            
})(this);
    
function getDeliveryDate(timeInTransit) {

  let currentDate = new Date();
  let utcHours = currentDate.getUTCHours();
  let utcMinutes = currentDate.getUTCMinutes();

  // cutoff for order placement is 14:00 hours US Central
  // warehouse pickup time is 15:00 hours US Central
  // UTC is 5 hours ahead
  let orderCutoffTime = 19;

  console.log("UTC time is " + utcHours + ":" + utcMinutes);

  if (utcHours => orderCutoffTime) {
    // after 2pm US Central
    // too late to fill order
    timeInTransit = timeInTransit + 1;
  }

  let daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currentDateDayIndex = currentDate.getDay();
  let currentDateDay = daysOfWeek[currentDateDayIndex];
    
  if (currentDateDay == "Saturday") {
        timeInTransit = timeInTransit + 2;
  } else if (currentDateDay == "Sunday") {
        timeInTransit = timeInTransit + 1;
  }

  console.log("timeInTransit is " + timeInTransit);

  let deliveryDate = new Date(currentDate);
      
  // add the time in transit
  deliveryDate.setDate(currentDate.getDate() + timeInTransit);
  
  let deliveryDateDayIndex = deliveryDate.getDay();
  let deliveryDateDay = daysOfWeek[deliveryDateDayIndex];
  // determine the month of the estimated delivery date
  let monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let deliveryDateMonthIndex = deliveryDate.getMonth()
  let deliveryDateMonth = monthsOfYear[deliveryDateMonthIndex];
  
  return "Arrives by " + deliveryDateDay + ", " + deliveryDateMonth + " " + deliveryDate.getDate();
}
    
ready('#checkout-shipping-options', function(element) {
    document.querySelectorAll('#checkout-shipping-options ul li').forEach(function(li) {
        var description = li.getElementsByClassName('shippingOption-desc')[0];
        if (description.textContent == '1 Day') {
            var div = document.createElement('div');
            var deliveryDate = getDeliveryDate(1);
            div.textContent = deliveryDate;
            div.style.cssText = 'font-weight: normal; font-size: 12px;';
            li.getElementsByClassName('shippingOptionLabel')[0].appendChild(div);
        } else if (description.textContent == '2 Days') {
            var div = document.createElement('div');
            var deliveryDate = getDeliveryDate(2);
            div.textContent = deliveryDate;
            div.style.cssText = 'font-weight: normal; font-size: 12px;';
            li.getElementsByClassName('shippingOptionLabel')[0].appendChild(div);
        } else if (description.textContent == '3 Days') {
            var div = document.createElement('div');
            var deliveryDate = getDeliveryDate(3);
            div.textContent = deliveryDate;
            div.style.cssText = 'font-weight: normal; font-size: 12px;';
            li.getElementsByClassName('shippingOptionLabel')[0].appendChild(div);
        } else if (description.textContent == '4 Days') {
            var div = document.createElement('div');
            var deliveryDate = getDeliveryDate(4);
            div.textContent = deliveryDate;
            div.style.cssText = 'font-weight: normal; font-size: 12px;';
            li.getElementsByClassName('shippingOptionLabel')[0].appendChild(div);
        } else if (description.textContent == '5 Days') {
            var div = document.createElement('div');
            var deliveryDate = getDeliveryDate(5);
            div.textContent = deliveryDate;
            div.style.cssText = 'font-weight: normal; font-size: 12px;';
            li.getElementsByClassName('shippingOptionLabel')[0].appendChild(div);
        } else if (description.textContent == '6 Days') {
            var div = document.createElement('div');
            var deliveryDate = getDeliveryDate(6);
            div.textContent = deliveryDate;
            div.style.cssText = 'font-weight: normal; font-size: 12px;';
            li.getElementsByClassName('shippingOptionLabel')[0].appendChild(div);
        } else if (description.textContent == '2nd Day Air') {
            var div = document.createElement('div');
            var deliveryDate = getDeliveryDate(2);
            div.textContent = deliveryDate;
            //div.textContent = 'This will show the delivery date for overnight.';
            div.style.cssText = 'font-weight: normal; font-size: 12px;';
            li.getElementsByClassName('shippingOptionLabel')[0].appendChild(div);
        } else if (description.textContent == 'Overnight') {
            var div = document.createElement('div');
            var deliveryDate = getDeliveryDate(1);
            div.textContent = deliveryDate;
            //div.textContent = 'This will show the delivery date for overnight.';
            div.style.cssText = 'font-weight: normal; font-size: 12px;';
            li.getElementsByClassName('shippingOptionLabel')[0].appendChild(div);
        }
        
    });
});   
