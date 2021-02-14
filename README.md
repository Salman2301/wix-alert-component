# Wix popup alert

Show a small alert box at any corner of screen.

Using web component.

Live demo link: [https://www.test.salman2301.com/alert-web-component](https://www.test.salman2301.com/alert-web-component)

# Instruction

There are different way we can use custom element in Wix Site.
I am showing three different way to use it.
The easy way is to use Wix Block with CDN and you can skip the below 2.

 - Wix Block + CDN
 - Public JS file
 - CDN

### Using Wix Block With CDN
Easy way is to use Custom elment in Wix site is by using with Wix Block. It provid some level of IDE support.

1. Click on this [link](http://wix.to/QcCAC7M). Follow the step to Install the Wix Block on any Wix site.
2. Drag and Drop the Widget or Wix Block.
4. Change the element Id to `widgetAlert` via the properties panel.
5. Drag and Drop a Custom element under `Add Element/Embed/Custom Element` and change the Id to `CustomAlert` via properties panel.
6. Click on the Custom element and select Change source.
7. Select `Server URL` paste this URL `https://cdn.jsdelivr.net/gh/salman2301/wix-alert-component@master/dist/index.js`
8. Set the Tag Name to `alerts-component`
9. Add the following Code in the page sections.

```
// page code.js
$w.onReady(function () {
  // This step is needed to let the Wix Block select the Custom element
	$w('#widgetAlert').setCustomElement($w('#CustomAlert'));
  
  // This will show Warning Alert 
	$w('#widgetAlert').alert("This is a warning message." )
});

```

Note:
 for the `alert` method, You can pass a string or object
```
  // using string
	$w('#widgetAlert').alert("This is a alert message." )
```
Is same as this
```
  // using object
	$w('#widgetAlert').alert({ message: "This is a alert message." })
```

You can also pass more options like title, type of alert, wait time, style using the object method

Checkout below [attribute `new alert`](https://github.com/Salman2301/wix-alert-component#attirbute-newalert)
  
```
  $w('#widgetAlert').alert({ title: "Hello", message: "Welcom to the site." })
```

### Without Using Wix Block or CDN.

Follow the steps below to setup web component in wix site using `public`js file.

1. Open the editor
2. Turn on [dev mode](https://support.wix.com/en/article/about-corvid-by-wix#to-enable-corvid-on-your-site)
3. Drag and drop [Custom Element](https://support.wix.com/en/article/corvid-about-custom-elements-8253009) from '+' icon > More > Custom Element (in Custom Embed Section)
4. Select 'Choose Source'
5. Select 'Corvid file'
6. Click on Select on of your file
7. If you don't have any file, it will show 'Create a new file' it will create a folder custom element
8. Open the `Public/custom-elements` in the `Site Structure` and create a new file, with a name `Snackbar.js`
9. Copy the code from this repo [dist/index.js](dist/index.js)
10. Paste the code in the `Snackbar.js` file
11. And then go to the page, where you drag and drop the custom element
12. Change the Tag Name field to `alerts-component`
13. Drag the element to (Header or Footer) or check "Show on all page" to set the element globally

### Using CDN

you can skip 5-11 steps by selecting the server URL option after point 4,

file is hosted in [jsdelivr](https://www.jsdelivr.com/)

Paste the below link and continue from step 12

[https://cdn.jsdelivr.net/gh/salman2301/wix-alert-component@master/dist/index.js](https://cdn.jsdelivr.net/gh/salman2301/wix-alert-component@master/dist/index.js)


---

## Available Atrributes

1. setposition
2. newalert

## Attirbute `setposition`

position demo:

![positions](/screenshot/position.gif)

Setposition allows you choose any corner of the website to show your alert. for desktop by default set to `bottom-right` and avaiable position are as follows

1. top-left
2. top-right
3. bottom-left
4. bottom-right

And for mobile

1. top
2. bottom

By default the alert will be center horizontally for mobile,

Responsive Demo:

![responsive](/screenshot/responsive.gif)

```js
// example wix code
$w.onReady(() => {
  $w("#CustomElement1").setAttribute("setposition", "top-right");
});
```

## Attirbute `newalert`

`newalert` takes a stringified Object with the `message` method.
Other methods are as follow

```js

  {
    // Optional changed based on type by Defalt it's "Oops" which is for Error type. use this to override.
   title : "Oops",
    //  required field, message display in the alert
   message : "Alert message!.",

   // set color of  alert based on success
   type:"success", // "error" | "info" | "warn"|"success"

   // if it's false, user need to click on the close button
   autoClose : true,

   // you can also use any word e.g: "ACTION"| "Yes"|"No"
   closeLabel : "X",

   // wait for 8 sec before autoClose, if it's set to true
   wait : 8,

   // custom css style
   style:"",

   // callback function trigger on autoClose or button click
   onClose: function(){},

   // callback function trigger on button click
   onAction: function(){},


   // brandColor set any hex, rgb color, refeclt the border
   brandColor:"#4BB543",

   // redirect url on title or message clicked!
   knowMoreUrl: "https://salman2301.com"
  }

```

```js
// Using Wix Block
$w("widgetAlert").alert("hello world!");

// OR

// Using Custom element without Wix Block
$w("#CustomElement1").setAttribute(
  "newalert",
  JSON.stringify({ message: "hello world!" })
);
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
};

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


// Using Wix Block
$w("widgetAlert").alert(alertPrivacy);

// Without Wix Block
$w("#CustomElement1").setAttribute("newalert", JSON.stringify(alertPrivacy));

```

```js
/*
  on Dataset Error
*/
let alertError = {
  message: "Something went wrong! Check the field and try again",
  wait: 12, // wait for 12 sec
  type: "error",
};

$w("#dataset").onReady(() => {
  $w("#dataset").onError(() => {

    // Using Wix Block
    $w("widgetAlert").alert(alertError);

    // Without Wix Block
    $w("#CustomElement1").setAttribute("newalert", JSON.stringify(alertError));
  });
});
```

## Design Update
Version 2 has better design Update

![Different type of Errors](screenshot/type%20of%20errors.jpg)

# Todo: V2

- [x] Ability to add link in message
- [ ] Allow html for message
- [x] Generate the code, using wix site
- [x] On Click of a message body, redirect to the url
- [x] Callback also need to fire .on() the webcomponent
- [x] Fix Animation on left side alerts
- [x] Fix Animation Fly in and Fly out!
- [x] Icon for type of message
- [x] Refactor the code
- [x] Demo link to test the component
- [x] Hosted Server URL

# Development

1. Clone this repo
2. goto the cloned folder
3. run `npm install`
4. and `npm run dev`
5. server should be running in port `5000`

# Tech stack Used

1. svelte

# License

MIT

# Reference Link

1. [Corvid Doc for custom element](https://www.wix.com/corvid/reference/$w.CustomElement.html)
2. [Svelte docs](https://svelte.dev/docs)

# Contact or Help

Leave a message in [my website](https://salman2301.com).
