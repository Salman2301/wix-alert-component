#  Wix popup alert
  
  Show a small alert box at any corner of screen.

  Using web component. 
  
  Live demo link: Comming Soon...


# Instruction
  Follow the steps below to use in wix site
  1. Open the editor
  2. Turn on [dev mode](https://support.wix.com/en/article/about-corvid-by-wix#to-enable-corvid-on-your-site)
  3. Drag and drop [Custom Element](https://support.wix.com/en/article/corvid-about-custom-elements-8253009) from '+' icon > More > Custom Element (in Custom Embed Section)
  4. Select 'Choose Source'
  5. Select 'Corvid file'
  7. Click on Select on of your file
  8. If you don't have any file, it will show 'Create a new file'
  9. Open the `Public/custom-elements` in the `Site Structure` and create a new file, with a name `Snackbar.js`
  10. Copy the code from this repo [build/index.js](build/index.js)
  11. Paste the code in the `Snackbar.js` file
  12. And then go to the page where you drag and drop the custom element
  13. Change the Tag Name field to `alerts-component`
  14. Drag the element to (Header or Footer) or check "Show on all page" to set the element globally 

## Available Atrributes
  1. setposition
  2. newalert

## Attirbute `setposition`
  position demo:
  ![positions](/readmeDoc/position.gif)
  
  Setposition allows you choose any corner of the website to show your alert. for desktop by default set to `bottom-right` and avaiable position are as follows
  1. top
  2. left
  3. right
  4. bottom
  5. top-left
  6. top-right
  7. bottom-left
  8. bottom-right

  And for mobile
  1. top
  2. bottom
  By default the alert will be center horizontally, 

  Responsive Demo:
  ![responsive](/readmeDoc/responsive.gif)


  ```js
    // example wix code
    $w.onReady(()=>{
      $w('#CustomElement1').setAttribute("setposition", "top-right");
    });

  ```

## Attirbute `newalert`
  `newalert` takes a stringified Object with the `message` method.
  Other methods are as follow

```js

  {
    //  required field, message display in the alert
   message : "Alert message!.",
   
   // set color of  alert based on success
   type:"success", // "error" | "info" | "warn""success" 

   // if it's false, user need to click on the close button
   autoClose : true,
   
   // you can also use any word e.g: "ACTION" || "Yes" || "No"
   closeLabel : "X", 
   
   // wait for 4 sec before autoClose, if it's set to true
   wait : 4,

   // custom css style
   style:"", 

   // callback function trigger on autoClose or button click
   onClose: function(){},
   
   // callback function trigger on button click
   onAction: function(){}, 
   
   
   // brandColor set any hex, rgb color, refeclt the border
   brandColor:"#4BB543",
  }

```

```js
  // example wix code
  $w.onReady(()=>{
    $w('#CustomElement1').setAttribute("newalert", JSON.stringify({message: "hellow world!"}));

```

```js
    /*
      Alert with action
    */
    let alertPrivacy = {
      message: "We Use cookies to store information! Accept our privacy policy!",
      autoClose: false,
      closeLabel: "Accept",
      onAction: handleAction,
    }

    
    function handleAction(e) {
      /*
        e => 	{
          reason : reason, // action | timeout
			    message: message, // your message
			    id: id
        }
      */
     // save your cookie	:)
    }
    $w('#CustomElement1').setAttribute("newalert", JSON.stringify(alertPrivacy));
```

```js
    /*
      on Dataset Error
    */
    let alertError = {
      message: "Something went wrong! Check the field and try again",
      wait: 12, // wait for 12 sec
      type: "error",
    }

    $w('#dataset').onReady(()=>{
      $w('#dataset').onError(()=>{
        $w('#CustomElement1').setAttribute("newalert", JSON.stringify(alertError));
      });
    });


  });
```

# Todo:
- [ ] Fix Animation Fly in and Fly out!
- [ ] Ability to add link in message or allow html for message
- [ ] Icon for type of message
- [ ] callback also need to fire .on() the webcomponent
- [ ] Demo link
- [ ] Generate the code
- [ ] Hosted Server URL

  
# Development
1. Clone this repo
2. goto the cloned folder
3. run `npm install`
4. and `npm run dev`
5. server should be running in port `5000`

# License
MIT

# Contact or Help
Leave a message in [my website](https://salman2301.com)