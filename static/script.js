//------------------------ALL PAGES--------------------------//

// Project page is too slow on mobile devices without a loading screen
// window.addEventListener('load',function(){
//     document.body.style.display='block';
// })

//-- Vertical Navigation Menu --
let navBtn = document.querySelector('#navBtn');
let navVert = document.querySelector('#navVert');
let navDropdown = document.querySelector('#navDropdown');
//Vertical navigation menu appears/disppears when menu button is clicked
navBtn.addEventListener('click',function(){
    if (navVert.style.display == ''){
        navVert.style.display = 'flex';
        //Vertical navigation menu disappears when mouse leaves the menu area
        navDropdown.addEventListener('mouseleave',function(){
            navVert.style.display = '';
        })
    }
    else{
        navVert.style.display = '';
    }
})

// -- "Scroll to Top of Page" Button --
let scrollBtn = document.querySelector('#pageTopBtn');
//Checks scroll position every 3s. If scroll position is greater than 0, the button is displayed
setInterval(function(){
    if (window.scrollY > 0){
        scrollBtn.style.display='block';
    }
    else{
        scrollBtn.style.display='';
    }
}, 3000)

// Onclick, button scrolls the screen to the top of the document
scrollBtn.addEventListener('click',function(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})

// -------------------------------------HOME PAGE------------------------------------//
if (document.querySelector('title').text=="Home"){
    const projID = ['n1','durable','lcd','multiphase','sps','zero','np','ncnt','fydp']; //ID for project images
    const projTitle = ['Non-Biocidal Marine Paint for Vessel Hulls','Durable Marine Coatings with High Biofouling Resistance','Optical Formulations for Liquid Crystal Displays','Tunable Surface Properties of Multiphase Polymers','Self-Stratifying Porous Silicones with Protective Skin Layer','Low-Waste Consumer Packaging Using Liquid-Infused Surfaces','Nanoparticle Diffusion for Drug Delivery Applications','Controlled Synthesis of Nitrogen-Doped Carbon Nanotubes','Antimicrobial Plastic for 3D Printing of Food-Safe Items']; //Project Title
    let pastProj = document.querySelector('#projAnimation'); //Project image and title displayed on Home Page
    let i = 0.5; //index for project image and title
    //When one animation iteration occurs, the counter will increase (2 increases for image to change)
    pastProj.addEventListener('animationiteration',function(){
        i+= 0.5;
        if (i >= projID.length){
            i=0;
        }
        this.children[0].src = 'static/images/portfolio_'+projID[Math.floor(i)]+'.jpg'; //Updates project image
        this.children[1].innerHTML = projTitle[Math.floor(i)]; //Updates project title
    })
}

// ---------------------------PORTFOLIO PAGE---------------------------//
if (document.querySelector('title').text == "Portfolio"){
    modal = document.querySelector(".modal");                // Modal element(box + translucent background) //Safari 13: Doesn't work with "let"
    projs = document.getElementsByClassName('modalProject'); // Project content for modal box  //Safari 13: Doesn't work with "let"
    footer = document.getElementById('modalFooter');         // Footer for modal box //Safari 13: Doesn't work with "let"
    x = document.querySelector(".close");                    // Close button for modal box //Safari 13: Doesn't work with "let"
    pageIndex = 1;                                           // Page number for project //Safari 13: Doesn't work with "let"
    // (1) MODAL DISPLAY
    // When a project image is clicked, display the modal
    document.addEventListener('click', viewProject);

    // Close the Modal
    // (a) When the user clicks on (x)
    x.onclick = function() {
        modal.style.display = "none";
        projs[projIndex].style.display = "none";
        removeDots();
        stopVideo();
    }

    // (b) When the user clicks anywhere outside of the box
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        projs[projIndex].style.display = "none";
        removeDots();
        stopVideo();
      }
    }

    // (2) PROJECT SLIDESHOW NAVIGATION
    //Arrows that navigate to next and previous page of a project
    var next = document.getElementsByClassName("rarr")[0]; //Safari 13: Doesn't work with "let"
    var prev = document.getElementsByClassName("larr")[0]; //Safari 13: Doesn't work with "let"

    //(i) Forward navigation
    // (a) When the right arrow is clicked
    next.addEventListener('click',function(){
        pageIndex += 1;
        showPage(pageIndex);
    });
    // (b) When the right arrow key is pressed and it is not the last project page
    document.addEventListener('keydown',function(){
        if (event.which == 39 && pageIndex != pages.length){
            pageIndex += 1;
            showPage(pageIndex);
        }
    });
    //(ii) Backwards navigation
    // (a) When the left arrow is clicked
    prev.addEventListener('click',function(){
        pageIndex -= 1;
        showPage(pageIndex);
    });
    // (b) When the left arrow key is pressed and it is not the first project page
    document.addEventListener('keydown',function(){
        if (event.which == 37 && pageIndex != 1){
            pageIndex -= 1;
            showPage(pageIndex);
        }
    });

    //(iii) Navigation dots
    // When a dot is clicked, the corresponding page appears
    footer.addEventListener('click', function(){
        if (event.target.className.match(/dot/) == 'dot'){
            pageIndex= parseInt(event.target.className.match(/\d+/)[0]);
            showPage(pageIndex);
        }
    });
    // Each page title for every project
    const pageTitle = [['<b>Background:</b> Surface Adhesion', 'Project Overview','SAP Surface Stratification', 'Surface Phase Properties', 'Surface Tunability via SAP Chemistry', 'Dynamic Texture with Water Exposure'],
    ['Background: Marine Coating Durability','Project Overview','Coating Abrasion Resistance', 'Coating Toughness', 'Coating Biofouling Resistance','Patent (Pending)'],
    ['<b>Problem:</b> Microbial Growth','<b>Solution:</b> Ag-HDPE Plastic','Ag Nanoparticle Synthesis', 'Ag Nanoparticles in HDPE', 'Antimicrobial Activity','Mechanical and Thermal Properties','Entrepreneurship Award','FYDP Symposium Poster'],
    ['<b>Background:</b> Bistable LCDs','Liquid Crystalline Polymer Synthesis','Fast State Switching of Optimized Formulation', 'Monochromatic Coloured Formulation', 'Rapid Display Prototyping'],
    ['<b>Background:</b> Marine Fouling','Limitations of Existing Marine Paint','<b>Goal:</b> Develop a Commercial Marine Paint','SLIPS<sup>®</sup> Technology','Paint Application Quality','Paint Quality Control', 'Coating Durability', 'Paint Scaleup', 'Boatyard Engagement', 'Real World Product Performance', 'Publication'],
    ['<b>Background:</b> N-CNTs','<b>Goal:</b> N-CNT Properties Tunable with Synthesis Parameters','N-CNT Structure', 'N-CNT Thermal Stability', 'Publication'],
    ['<b>Background:</b> Nanoparticles for Cancer Treatment','<b>Goal:</b> Investigate Nanoparticle Diffusion in ECM', 'Nanoparticle Diffusion Setup','Nanoparticle Diffusion Characterization'],
    ['Abstract','Preparation of SPS','Porosity and Pore Size', 'Protective Skin Layer', 'Preparation of iSPS', 'Fluid Repellency','Improved Oil Capacity','Improved Oil Retention','Fouling Release of Biofilms','Biofouling Prevention vs. Model Organisms','Publication','Patent'],
    ['Viscous Products in Plastic Containers','Liquid-Infused Plastic Containers','SLIPS<sup>®</sup>Zero vs. Detergent','SLIPS<sup>®</sup>Zero vs. Honey']
    ];
    // On dot mouseover, the page title is added and displayed
    modal.addEventListener('mouseover',function(){
        if (event.target.className.match(/dot/) == 'dot'){
            let i = parseInt(event.target.className.match(/\d+/)[0]);
            let pageName =modal.querySelector('#pageName')
            pageName.innerHTML = pageTitle[projIndex][i-1];
            pageName.style.display = 'inline';
        }
        // For any other mouseover, the page title is removed
        else{
            modal.querySelector('#pageName').innerHTML = '';
        }
    })

    // (iv) Functions
    // Display the selected project and page number in the modal
    function showPage(index){
        var length = pages.length;
        // All pages of a project are hidden and dot color is reset
        for (let i = 0; i < length; i++) {
            pages[i].style.display = 'none';
            dots[i].style.backgroundColor='';
            //Resets video if page is changed
            let video = pages[i].querySelector('video');
            if (video != null){
                video.currentTime = 0;
                video.pause();
            }
        }
        pages[index-1].style.display = "block";
        dots[index-1].style.backgroundColor='black';

        if (index == 1){
            prev.style.display = 'none';
        }
        else {
            prev.style.display = '';
        }
        if (index == length){
            next.style.display = 'none';
        }
        else {
            next.style.display = '';
        }
        //If a page has a video, autoplay the video
        if (pages[index-1].querySelector('video') != null){
            pages[index-1].querySelector('video').currentTime = 0;
            pages[index-1].querySelector('video').play();
        }
    }

    function viewProject(event){
        if(event.target.className == 'projBtn'){
            projIndex = event.target.id; //sets project index based on clicked project // GLOBAL SCOPE
            projs[projIndex].style.display = 'block';
            modal.style.display = "block";
            pageIndex = 1;  //resets page index
            pages = projs[projIndex].getElementsByClassName('modalPage'); //GLOBAL SCOPE
            addDots();
            dots = document.getElementsByClassName('dot'); //GLOBAL SCOPE
            showPage(pageIndex); // Show 1st page for clicked project
        }
    }
    // Adds a navigation dot to modal footer for each project page
    function addDots(){
        for (let i=0; i <pages.length;i++){
            let dot = document.createElement("span");
            dot.className = `dot c${i+1}`;
            footer.appendChild(dot);
        }
    }
    // Removes dots from HTML after modal box is closed
    function removeDots(){
        let length = dots.length;
        while (length > 0){
            dots[length - 1].remove();
            length--;
        }
    }

    // Resets every video after modal box is closed
    function stopVideo(){
        let videos = modal.querySelectorAll('video');
        for (let video of videos){
            video.load();
        }
    }
}

//-------------------------------------RESUME------------------------------ //
if (document.querySelector('title').text=='Resume'){
    const tables = document.querySelectorAll('.grid');
    for (const table of tables){
        table.addEventListener('click',function(){
            let click = event.target.parentNode
            if (click.className =='dropdown' || click.tagName =='H4' || click.className =='grid'){
                let jobDetails = event.currentTarget.querySelector('.hiddenList');
                let arrow = event.currentTarget.querySelector('.tri');
                if (jobDetails.style.display ==""){
                    jobDetails.style.display = 'block';
                    arrow.style.animation ='rotate linear 0.1s forwards';
                }
                else{
                    jobDetails.style.display = "";
                    arrow.style.animation = "";
                }
            }
        })
    }
}

//--------------------------ABOUT ------------------------------//

if (document.querySelector('title').text == 'About Me'){
    const hobbies = document.querySelectorAll('.hobby');
    const rad = Math.PI /6 ;
    let angle = 0;
    let viewWidth = window.innerWidth;

    // (1) Position the hobby icons equally around the circle's circumference
    for (let hobby of hobbies){
        //Method A: Best Method (Use CSS transform X,Y to center icons)
        let el = document.querySelector('#' + hobby.id);
        let left = 50 + 100*(Math.sin(angle))/(2);
        let bot = 50 + 100*(Math.cos(angle))/(2);
        el.style.left =`${left}%`;
        el.style.bottom =`${bot}%`;
        angle += rad;

        //Method B)  Width doesn't work with window.load
        // let width = el.clientWidth; // el.width worked for Firefox and Chrome, not Safari
        // let left = 50 + 100*(Math.sin(angle))/(2) - 100*(width/2)/(0.4*viewWidth);
        // let bot = 50 + 100*(Math.cos(angle))/(2) - 100*(width/2)/(0.4*viewWidth);

        //Method C) 1) Only works on reload, 2) Icons out of order
        // el.addEventListener('load',function(){
        //     console.log(el.height)
        //     height = el.height;
        //     width = el.width;
        //     let left = 50 + 100*(Math.sin(angle))/(2) - 100*(width/2)/(0.4*viewWidth);
        //     let bot = 50 + 100*(Math.cos(angle))/(2) - 100*(height/2)/(0.4*viewWidth);
        // })
    }

    // (2) Change text and icon opacity every 2 seconds (to match with circle rotation)
    let hobbyWheel = document.querySelector('.static')
    let i = 0;
    let opacity = 0.6;

    const hobbyTitle = ['Working Out','Science','Wellness','Puzzles','Tennis','Reading', 'Piano','Mathematics', 'Video Games', 'Board Games','Finances','Baking'];
    setInterval(function(){
        hobbyWheel.innerHTML = hobbyTitle[i];
        hobbies[11 - i].style.opacity = 1;

        if (i ==0){
            hobbies[0].style.opacity = opacity;
        }
        else{
            hobbies[12 - i].style.opacity = opacity;
        }
        i++;
        if (i == 12){
            i = 0;
        }
    },2000)
}

//-------------------------CONTACT---------------------------//
if (document.querySelector('title').text=='Contact'){
    let bulb = document.querySelector('#bulb');
    //On mouseover, change the BW bulb to a coloured bulb
    bulb.addEventListener('mouseover',function(){
        bulb.src= 'static/images/contact_lightbulb_color.png'
    })
}
