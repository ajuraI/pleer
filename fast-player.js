class PlayersContainer {
    constructor() {
        this.rPlayers = []
        this.currentPlayed = undefined

        document.addEventListener("DOMContentLoaded", () => {
            this.rPlayers = document.querySelectorAll("r-player")

            this.rPlayers.forEach(rPlayer => {
                this.setOnEndListener(rPlayer)
                this.setOnPlayListener(rPlayer)
            })

        });
    }

    setOnEndListener = (player) => {
        player.addEventListener("onEnd", (e) => {
            var setNextPlayer = false
            var nextPlayer = undefined

            this.rPlayers.forEach(rPlayer => {
                if (setNextPlayer) {
                    nextPlayer = rPlayer
                    setNextPlayer = false
                } else {
                    rPlayer.pause()
                    if(rPlayer === player) {
                        setNextPlayer = true
                    }
                } 
            })

            if (nextPlayer) {
                nextPlayer.play()
            }
        });
    }

    setOnPlayListener = (player) => {
        player.addEventListener("onPlay", (e) => {
            this.rPlayers.forEach(rPlayer => {
                if(rPlayer !== player && rPlayer.els.pause.style.display == "flex") {
                    rPlayer.moveTo(0);
                    rPlayer.pause();
                }
            })
        });
    }
}

var playersContainer = new PlayersContainer()

document.addEventListener("DOMContentLoaded", () => {
    class RPlayer extends HTMLElement {
        constructor() {
            super()

            var shadow = this.attachShadow({ mode: 'open' });
            if (this.hasAttribute('src')) {
                if (this.hasAttribute('name')) var name = this.getAttribute('name');
                if (this.hasAttribute('dwnload') && this.getAttribute('dwnload') === 'true') {
                    var dwnloadParams = 'black'
                    var dwnload = 'true';
                }
				 else {
                    var dwnloadParams = 'gray'
                    var dwnload = 'false';
                }
               
                if (!this.hasAttribute('menu') || this.getAttribute('menu') === 'false') var menu = 'disablemenu';
                if (this.hasAttribute('idNum')) var idNum = this.getAttribute('idNum');
				if (this.hasAttribute('downloadbut')) var downloadbut = this.getAttribute('downloadbut');
                if (this.hasAttribute('author')) var author = this.getAttribute('author');
                if (this.hasAttribute('uptop')) var uptop = this.getAttribute('uptop');
                if (this.hasAttribute('lowtop')) var lowtop = this.getAttribute('lowtop');
                if (this.hasAttribute('picture')) var picture = this.getAttribute('picture');
                else picture = "https://img.icons8.com/cute-clipart/64/000000/music-library.png";
                if (this.hasAttribute('type')) var type = this.getAttribute('type');
                if (type === 'premium') {
                    var premiumGradient = 'background: linear-gradient(to top, rgba(255, 230, 215, 1), rgba(255, 230, 215, 0.4));'
                }
                else {
                    var premiumGradient = 'background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.4));'
                }
                if (this.hasAttribute('content')) var content = this.getAttribute('content');
                if (content) {
                    var bufferInfo = content;
                    content = '<div class="info"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="17px" height="17px"><defs/><path d="M256.002 182.774c-12.718 0-21.761 5.37-21.761 13.283V303.73c0 6.782 9.044 13.565 21.761 13.565 12.152 0 22.043-6.783 22.043-13.565V196.057c0-7.913-9.891-13.283-22.043-13.283zM256.002 116.361c-13 0-23.174 9.326-23.174 20.065s10.174 20.348 23.174 20.348c12.718 0 22.892-9.609 22.892-20.348 0-10.738-10.175-20.065-22.892-20.065z"/><path d="M256 0C134.398 0 36 98.348 36 219.873c0 99.231 65.333 181.626 153.417 209.609l50.032 73.747C243.171 508.715 249.37 512 256 512s12.829-3.285 16.551-8.771l50.032-73.747C410.706 401.486 476 319.061 476 219.873 476 98.271 377.523 0 256 0zm48.645 393.099c-4.555 1.274-8.51 4.12-11.165 8.033L256 456.376l-37.479-55.243c-2.656-3.913-6.611-6.76-11.166-8.033C132.377 372.135 76 303.181 76 219.873 76 120.69 156.748 40 256 40s180 80.69 180 179.873c0 83.391-56.46 152.285-131.355 173.226z"/></svg></div>'
                }
                else {
                    content = "";
                    var bufferInfo = ""
                }
                var social = "";
                if (this.hasAttribute('inst')) {
                    var inst = this.getAttribute('inst');
                    if (inst) social = social + '<div class="list__item"><a class="inst" href="' + inst + '" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision"viewBox="0 0 13.53 13.53" height="35px"><defs/><defs><linearGradient id="a" x1="-1.1" x2="12.31" y1="-1.96" y2="12.37" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"/><stop offset=".501961" stop-color="#ff543e"/><stop offset="1" stop-color="#c837ab"/></linearGradient></defs><circle cx="6.76" cy="6.76" r="6.76" fill="url(#a)"/><path fill="#fff" d="M6.76 2.7c-1.66 0-3.24-.15-3.85 1.4-.25.64-.21 1.47-.21 2.66 0 1.05-.03 2.03.21 2.66.61 1.56 2.2 1.41 3.85 1.41 1.6 0 3.24.16 3.85-1.41.25-.64.22-1.46.22-2.66 0-1.58.08-2.61-.69-3.38-.78-.78-1.83-.68-3.38-.68zm-.36.73c3.47 0 3.92-.39 3.67 4.97-.09 1.9-1.53 1.69-3.31 1.69-3.23 0-3.33-.09-3.33-3.33 0-3.27.26-3.33 2.97-3.33zm2.53.68c-.27 0-.48.21-.48.48s.21.49.48.49.49-.22.49-.49-.22-.48-.49-.48zm-2.17.57c-1.15 0-2.08.93-2.08 2.08 0 1.16.93 2.09 2.08 2.09 1.16 0 2.09-.93 2.09-2.09 0-1.15-.93-2.08-2.09-2.08zm0 .73c1.79 0 1.8 2.71 0 2.71-1.79 0-1.79-2.71 0-2.71z"/></svg></a></div>';
                }
                if (this.hasAttribute('spotify')) {
                    var spotify = this.getAttribute('spotify');
                    if (spotify) social = social + '<div class="list__item"><a class="spotify" href="' + spotify + '" target="_blank"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 427.652 427.652" height="35px"><defs/><path fill="#00d95f" d="M213.826 0C95.733 0 0 95.733 0 213.826s95.733 213.826 213.826 213.826 213.826-95.733 213.826-213.826S331.919 0 213.826 0zm93.06 310.32c-2.719 4.652-7.612 7.246-12.638 7.247-2.506 0-5.044-.645-7.364-2-38.425-22.456-82.815-26.065-113.295-25.138-33.763 1.027-58.523 7.692-58.769 7.76-7.783 2.126-15.826-2.454-17.961-10.236-2.134-7.781 2.43-15.819 10.209-17.962 1.116-.307 27.76-7.544 64.811-8.766 21.824-.72 42.834.801 62.438 4.52 24.83 4.71 47.48 12.978 67.322 24.574 6.973 4.074 9.321 13.03 5.247 20.001zm27.184-56.459c-3.22 5.511-9.016 8.583-14.97 8.584-2.968 0-5.975-.763-8.723-2.369-45.514-26.6-98.097-30.873-134.2-29.776-39.994 1.217-69.323 9.112-69.614 9.192-9.217 2.515-18.746-2.906-21.275-12.124-2.528-9.218 2.879-18.738 12.093-21.277 1.322-.364 32.882-8.937 76.77-10.384 25.853-.852 50.739.949 73.96 5.354 29.412 5.58 56.241 15.373 79.744 29.108 8.26 4.826 11.042 15.434 6.215 23.692zm16.711-51.335c-3.641 0-7.329-.936-10.7-2.906-108.207-63.238-248.572-25.643-249.977-25.255-11.313 3.117-23.008-3.527-26.124-14.839-3.117-11.312 3.527-23.008 14.839-26.124 1.621-.447 40.333-10.962 94.166-12.737 31.713-1.044 62.237 1.164 90.72 6.567 36.077 6.844 68.987 18.856 97.815 35.704 10.13 5.92 13.543 18.931 7.623 29.061-3.95 6.76-11.059 10.529-18.362 10.529z"/>/svg></a></div>';
                }
                if (this.hasAttribute('soundcloud')) {
                    var soundcloud = this.getAttribute('soundcloud');
                    if (soundcloud) social = social + '<div class="list__item"><a class="soundcloud" href="' + soundcloud + '" target="_blank">  <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 13.53 13.53" height="35"><defs/> <circle cx="6.76" cy="6.76" r="6.76" fill="#ff6a22"/><path fill="#fff" d="M2.01 8.3c0 .02-.01.04-.04.04-.02 0-.03-.02-.03-.04l-.08-.54.08-.54c0-.02.01-.04.03-.04.03 0 .04.02.04.04l.09.54-.09.54zm.37.32c0 .03-.02.04-.04.04s-.04-.01-.04-.04l-.1-.86.1-.88c0-.02.02-.04.04-.04s.04.02.04.04l.11.88-.11.86zm.39.15c0 .03-.02.05-.05.05-.02 0-.04-.02-.05-.05l-.09-1.01.09-1.04c.01-.03.03-.05.05-.05.03 0 .05.02.05.05l.11 1.04-.11 1.01zm.4.03c0 .03-.03.06-.06.06s-.05-.03-.06-.06l-.08-1.04.08-1.07c.01-.03.03-.06.06-.06s.06.03.06.06l.1 1.07-.1 1.04zm.4.01c0 .04-.03.06-.07.06-.03 0-.06-.02-.06-.06l-.09-1.05.09-.99c0-.04.03-.07.06-.07.04 0 .07.03.07.07l.09.99-.09 1.05zm.4 0c0 .04-.03.07-.07.07-.04 0-.08-.03-.08-.07l-.07-1.05.07-1.61c0-.05.04-.08.08-.08s.07.03.07.07l.09 1.62-.09 1.05zm.4 0c0 .04-.04.08-.08.08-.05 0-.08-.04-.08-.08l-.08-1.04.08-1.99c0-.05.03-.08.08-.08.04 0 .08.03.08.08l.08 1.99-.08 1.04zm.42-.02c-.01.05-.05.09-.1.09-.04 0-.08-.04-.09-.09l-.06-1.03.06-2.15c.01-.05.05-.09.09-.09.05 0 .09.04.1.09l.07 2.15-.07 1.03zm.41 0c0 .05-.05.1-.1.1-.06 0-.1-.05-.1-.1l-.06-1.03L5 5.54c0-.06.04-.1.1-.1.05 0 .1.04.1.1l.07 2.22-.07 1.03zm.41-.01c0 .06-.05.1-.11.1-.05 0-.1-.04-.1-.1l-.06-1.02.06-2.17c0-.06.05-.1.1-.1.06 0 .11.04.11.1l.07 2.17-.07 1.02zm.42-.01c0 .07-.05.12-.11.12-.07 0-.12-.05-.12-.12l-.05-1.01.05-2.09c0-.06.05-.11.12-.11.06 0 .11.05.11.11l.06 2.1-.06 1zm.43-.1l-.01.09c0 .04-.01.07-.03.09-.03.02-.06.04-.09.04-.04 0-.07-.02-.1-.05-.01-.02-.02-.04-.03-.07v-.01s-.04-.99-.04-1L6.2 5.3v-.02c0-.05.03-.09.06-.11.02-.01.04-.02.07-.02.02 0 .05.01.07.02.03.03.05.06.05.11l.06 2.49-.05.9zm.41.08c0 .07-.06.13-.13.13s-.13-.06-.13-.13l-.03-.49-.03-.49.06-2.71v-.01c0-.04.02-.08.05-.1.02-.02.05-.03.08-.03s.05.01.07.02c.04.02.06.06.06.11l.06 2.72-.06.98zm3.59.13H7.12c-.08 0-.13-.06-.13-.13V4.92c0-.07.02-.11.11-.14.24-.09.5-.14.77-.14 1.11 0 2.03.85 2.12 1.93.14-.06.3-.09.47-.09.66 0 1.2.54 1.2 1.21 0 .66-.54 1.19-1.2 1.19z"/></svg></a></div>';
                }
                if (this.hasAttribute('yandex')) {
                    var yandex = this.getAttribute('yandex');
                    if (yandex) social = social + '<div class="list__item"><a class="yandex" href="' + yandex + '" target="_blank">  <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 13.55 16.16" height="35"><defs/><path fill="#fc0" d="M13.55 9.38c0-3.74-3.03-6.77-6.77-6.77C3.03 2.61 0 5.64 0 9.38c0 3.74 3.03 6.78 6.78 6.78 3.74 0 6.77-3.04 6.77-6.78z"/><path fill="#f33" d="M9.91 3.01v5.85H9.9v.01c0 .57-.04 1.11-.12 1.38-.37 1.31-1.58 2.26-3.01 2.26-1.73 0-3.12-1.4-3.12-3.12 0-1.73 1.39-3.13 3.12-3.13.81 0 1.56.32 2.11.82.18.17.35.36.49.56-.04-.18-.08-.41-.08-.61V0l4.08 1.25v2.82L9.91 3.01z"/></svg></a></div>';
                }
                if (this.hasAttribute('itunes')) {
                    var itunes = this.getAttribute('itunes');
                    if (itunes) social = social + '<div class="list__item"><a class="itunes" href="' + itunes + '" target="_blank">  <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 13.53 13.53" height="35"><defs/><defs><linearGradient id="a" x1="11.34" x2="1.96" y1="14.09" y2="-1.23" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#21c7fe"/><stop offset=".239216" stop-color="#70bcfb" stop-opacity=".917647"/><stop offset=".368627" stop-color="#916cff"/><stop offset=".501961" stop-color="#b87eb0"/><stop offset=".619608" stop-color="#e3658a"/><stop offset=".74902" stop-color="#fe5c6c"/><stop offset="1" stop-color="#ff5e50"/></linearGradient></defs><path fill="url(#a)" d="M6.77 0C3.03 0 0 3.03 0 6.76c0 3.74 3.03 6.77 6.77 6.77 3.73 0 6.76-3.03 6.76-6.77C13.53 3.03 10.5 0 6.77 0zm2.22 9.96c.4-.12.68-.41.79-.82l.04-.12V5.8c.01-2.41 0-3.23-.01-3.28-.01-.05-.04-.09-.06-.12-.05-.02-.1-.04-.15-.04-.04 0-.18.02-.31.05-.56.1-3.9.78-3.96.8-.09.04-.17.12-.21.2l-.04.07s-.02 5.05-.04 5.1c-.04.09-.13.17-.21.2-.03.01-.18.04-.33.07-.67.14-.91.24-1.13.45-.11.12-.2.28-.24.46-.04.16-.03.41.03.55.05.16.14.29.25.4.11.08.23.14.37.18.31.08.88-.01 1.17-.18.13-.08.28-.23.37-.35.03-.05.08-.15.1-.23.1-.25.1-4.77.11-4.83.03-.09.09-.16.18-.19.08-.02 3.29-.67 3.38-.68.08-.01.16.01.2.06l.06.06c.02.04.02.12.03 1.55 0 1.64 0 1.61-.08 1.71-.07.08-.15.11-.47.17-.5.11-.67.16-.86.25-.24.12-.37.25-.47.47-.07.15-.1.26-.1.42 0 .27.09.48.3.69.02.02.04.04.06.05.1.08.21.13.34.17.2.04.61.01.89-.07zm-2.22 3c-3.43 0-6.2-2.77-6.2-6.2C.57 3.34 3.34.57 6.77.57c3.42 0 6.19 2.77 6.19 6.19 0 3.43-2.77 6.2-6.19 6.2z"/></svg></a></div>';
                }
                if (this.getAttribute('inst') === "" && this.getAttribute('soundcloud') === "" && this.getAttribute('yandex') === "" && this.getAttribute('itunes') === "" && this.getAttribute('spotify') === "") menu = 'disablemenu';

                if (this.hasAttribute('cat') && this.getAttribute('cat') != "") {
                    var cat = this.getAttribute('cat');
                    if (type === 'premium') {
                        var crown = '<div style="padding-right: 5px;display:flex;align-items:flex-end;padding-bottom: 3px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -92 512 512" height="20"><defs/><path fill="#EC4A03" d="M77.671875 277.976562v34.386719c0 8.328125 6.75 15.078125 15.078125 15.078125h326.5c8.328125 0 15.078125-6.75 15.078125-15.078125v-34.386719zm0 0M512 86.316406c0-26.863281-21.855469-48.71875-48.71875-48.71875s-48.714844 21.855469-48.714844 48.71875c0 12.914063 5.058594 24.664063 13.292969 33.390625-14.644531 16.382813-35.910156 26.722657-59.558594 26.722657-38.28125 0-70.34375-27.0625-78.101562-63.054688 8.957031-8.839844 14.519531-21.109375 14.519531-34.65625C304.71875 21.855469 282.863281 0 256 0s-48.71875 21.855469-48.71875 48.71875c0 13.546875 5.566406 25.816406 14.519531 34.65625-7.757812 35.992188-39.820312 63.054688-78.101562 63.054688-23.648438 0-44.914063-10.339844-59.558594-26.722657C92.375 110.980469 97.4375 99.230469 97.4375 86.316406c0-26.863281-21.855469-48.71875-48.71875-48.71875S0 59.453125 0 86.316406c0 23.28125 16.417969 42.789063 38.28125 47.578125 4.324219 35.6875 12.679688 79.167969 28.8125 113.925781h377.8125c16.132812-34.757812 24.488281-78.238281 28.8125-113.925781C495.582031 129.101562 512 109.597656 512 86.316406zm0 0"/></svg></div>'
                    }
                    else {
                        var crown = ""
                        
                    }
                }
                else {
                    var cat = "";
                    var crown = "";
                }
                if (this.hasAttribute('count') && this.getAttribute('count') != "" ) var count = '<div style="padding-left:8px;padding-right:2px;display: flex; justify-content: center; align-items: flex-start; padding-top:10px"><svg xmlns="http://www.w3.org/2000/svg" id="Capa_1" enable-background="new 0 0 512.081 512.081" height="15px" viewBox="0 0 512.081 512.081" width="15px"><g><g><g id="Flame"><path d="m327.422 490.31c18.552-37.104 40.66-100.284 9.776-127.528-28.468 4.275-51.488 4.301-70.218.096-47.164-10.59-62.093-47.957-49.108-95.81-63.456 57.989-66.135 143.494-42.611 225.83 3.821 13.375-11.15 24.33-22.743 16.602-3.948-2.632-96.68-65.567-96.68-162.481 0-158.769 180-165.6 180-332 0-12.711 14.894-19.668 24.641-11.492 71.928 60.337 202.812 205.378 195.467 338.776-3.641 66.132-39.57 122.385-106.788 167.197-12.714 8.473-28.59-5.483-21.736-19.19z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#F05252"></path></g></g></g> </svg></div><div class="count">' + this.getAttribute('count');
                else var count = '<div class="count">';
                
                var html = `<link href="player.css" rel="stylesheet" type="text/css"/>
                <div class="player-box"><div class="player" id="id__${idNum}" uptop=${uptop} lowtop=${lowtop}>
                    <audio class="audio">
                        <source src="${this.getAttribute('src')}" type="audio/mpeg">
                    </audio>
                    <div class="reg">Только для радиостанций!</div>
                    <div class="picture-box ${type}"><img class="mainpicture" src="${picture}" alt="" height="115"><div class="play-box" style="display: flex;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 477.886 477.886" style="enable-background:new 0 0 477.886 477.886;" xml:space="preserve" width="17px" height="18px" class=""><g><g>
<g>
<path d="M476.091,231.332c-1.654-3.318-4.343-6.008-7.662-7.662L24.695,1.804C16.264-2.41,6.013,1.01,1.8,9.442    c-1.185,2.371-1.801,4.986-1.8,7.637v443.733c-0.004,9.426,7.633,17.07,17.059,17.075c2.651,0.001,5.266-0.615,7.637-1.8    L468.429,254.22C476.865,250.015,480.295,239.768,476.091,231.332z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"></path>
</g>
</g></g> </svg>
</div><div class="pause-box"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="17px" height="18px"><g><g>
<g>
<path d="M181.333,0H74.667c-17.643,0-32,14.357-32,32v448c0,17.643,14.357,32,32,32h106.667c17.643,0,32-14.357,32-32V32    C213.333,14.357,198.976,0,181.333,0z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
</g>
</g><g>
<g>
<path d="M437.333,0H330.667c-17.643,0-32,14.357-32,32v448c0,17.643,14.357,32,32,32h106.667c17.643,0,32-14.357,32-32V32    C469.333,14.357,454.976,0,437.333,0z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#FFFFFF"/>
</g>
</g></g> </svg></div></div>
                    <div class="hide-block ${type}"></div>
                    <div class="info-block ${type}">
                        <div class="titleLine">
                            <div class="tittleText">О треке - <span>${name}</span></div>
                            <div class="cross"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="14px" height="14px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                            viewBox="0 0 500 500"
                             xmlns:xlink="http://www.w3.org/1999/xlink">
                             <defs>
                              <style type="text/css">
                               <![CDATA[
                                .str0 {stroke:#FF3300;stroke-width:40;stroke-linecap:round}
                                .fil0 {fill:none}
                               ]]>
                              </style>
                             </defs>
                             <g id="Layer_x0020_1">
                              <metadata id="CorelCorpID_0Corel-Layer"/>
                              <path class="fil0 str0" d="M425 75l-350 350m350 0l-350 -350"/>
                             </g>
                            </svg></div>
                        </div>
                        <div class="textarea-wrapper">
                            <textarea disabled>${bufferInfo}</textarea>
                            <div class="whiteline" style = "${premiumGradient}"></div>
                        </div>
                    </div>
                    <div class="wrapper">
                    <div class="track-box ${type}">
                        <div class="line1">
                            <div class="line1__block1">
                                ${crown}
                                <div class="cat">
                                ${cat}</div>${count}</div>
                            </div>
                            <div class="line1__block2">
                                ${content}
                                <a class="dwnld" style="display: ${downloadbut};" type=${dwnloadParams} onclick="if (${dwnload}) {window.open('${this.getAttribute('src')}')}" onclick="return ${dwnload}">
									
                                    <div class="corner2"  style="display:flex;opacity:0;padding-bottom: 3px;height:5px;justify-content:center;align-items:center">
									
	<svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 1.84 .92" height="5">
                                    <defs/>
                                    <path fill="#ccc" d="M1.84 0L.92.92 0 0z"/>
                                    </svg>
									
                                    </div>
<svg version="1.1" width="17px" height="17px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g><path fill=${dwnloadParams} d="M472,313v139c0,11.028-8.972,20-20,20H60c-11.028,0-20-8.972-20-20V313H0v139c0,33.084,26.916,60,60,60h392c33.084,0,60-26.916,60-60V313H472z"/></g>
<g><polygon fill=${dwnloadParams} points="352,235.716 276,311.716 276,0 236,0 236,311.716 160,235.716 131.716,264 256,388.284 380.284,264"/></g>
</svg>


                                </a>
                                <div class="${menu} option-btn">
                                <div class="soc_icon" style="height:15px">
								
								<svg version="1.1" width="17px" height="17px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <g>
                                        <path d="M406,332c-29.636,0-55.969,14.402-72.378,36.571l-141.27-72.195C194.722,288.324,196,279.809,196,271
                                            c0-11.931-2.339-23.324-6.574-33.753l148.06-88.958C354.006,167.679,378.59,180,406,180c49.626,0,90-40.374,90-90
                                            c0-49.626-40.374-90-90-90c-49.626,0-90,40.374-90,90c0,11.47,2.161,22.443,6.09,32.54l-148.43,89.18
                                            C157.152,192.902,132.941,181,106,181c-49.626,0-90,40.374-90,90c0,49.626,40.374,90,90,90c30.122,0,56.832-14.876,73.177-37.666
                                            l140.86,71.985C317.414,403.753,316,412.714,316,422c0,49.626,40.374,90,90,90c49.626,0,90-40.374,90-90
                                            C496,372.374,455.626,332,406,332z M406,30c33.084,0,60,26.916,60,60s-26.916,60-60,60s-60-26.916-60-60S372.916,30,406,30z
                                            M106,331c-33.084,0-60-26.916-60-60s26.916-60,60-60s60,26.916,60,60S139.084,331,106,331z M406,482c-33.084,0-60-26.916-60-60
                                            s26.916-60,60-60s60,26.916,60,60S439.084,482,406,482z"/>
                                    </g>

                                </svg>
                                </div>

                                <div class="menu_cross"><svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="17px" height="17px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
                                viewBox="0 0 500 500"
                                xmlns:xlink="http://www.w3.org/1999/xlink">
                                <defs>
                                <style type="text/css">
                                <![CDATA[
                                    .str0 {stroke:#FF3300;stroke-width:40;stroke-linecap:round}
                                    .fil0 {fill:none}
                                ]]>
                                </style>
                                </defs>
                                <g id="Layer_x0020_1">
                                <metadata id="CorelCorpID_0Corel-Layer"/>
                                <path class="fil0 str0" d="M425 75l-350 350m350 0l-350 -350"/>
                                </g>
                                </svg></div>
                                        
                                </div>
                            </div>
                        </div>
                        <div class="line2">${name}</div>
                        <div class="line3">${author}</div>
                        <div class="socialLine">${social}</div>
                    </div>
                    <div class="progress-box ${type}">
                        <div class="currentTime">0:00</div>
                        <div style="width:96%;margin-right:6px;margin-left:4px;position:relative">
                            <div class="progressline"></div>
                            <div class="emptyline"></div>
                            <div class="progressthumb"></div>
                            <input class="progressbar ${type}" type="range" value ="0" min="0" max="1000">
                        </div>
                        <div class="audioDuration"></div>
                    </div>
                    </div>
                </div></div>`;
                

                this.shadowRoot.innerHTML = html;
                this.els = {
                    playerBox: this.shadowRoot.querySelector(".player-box"),
                    progress: this.shadowRoot.querySelector(".progressbar"),
                    audio: this.shadowRoot.querySelector(".audio"),
                    play: this.shadowRoot.querySelector(".play-box"),
                    pause: this.shadowRoot.querySelector(".pause-box"),
                    menu: this.shadowRoot.querySelector(".option-btn"),
                    soc_icon: this.shadowRoot.querySelector(".soc_icon"),
                    menu_cross: this.shadowRoot.querySelector(".menu_cross"),
                    corner: this.shadowRoot.querySelector(".corner"),
                    corner2: this.shadowRoot.querySelector(".corner2"),
                    block2: this.shadowRoot.querySelector(".line1__block2"),
                    dwnld: this.shadowRoot.querySelector(".dwnld"),
                    spotify: this.shadowRoot.querySelector(".spotify"),
                    inst: this.shadowRoot.querySelector(".inst"),
                    soundcloud: this.shadowRoot.querySelector(".soundcloud"),
                    yandex: this.shadowRoot.querySelector(".yandex"),
                    itunes: this.shadowRoot.querySelector(".itunes"),
                    reg: this.shadowRoot.querySelector(".reg"),
                    info: this.shadowRoot.querySelector(".info"),
                    infoBlock: this.shadowRoot.querySelector(".info-block"),
                    titleLine: this.shadowRoot.querySelector(".titleLine"),
                    textarea: this.shadowRoot.querySelector(".textarea-wrapper"),
                    hideBlock: this.shadowRoot.querySelector(".hide-block"),
                    trackBox: this.shadowRoot.querySelector(".track-box"),
                    progressBox: this.shadowRoot.querySelector(".progress-box"),
                    wrapper: this.shadowRoot.querySelector(".wrapper"),
                    line2: this.shadowRoot.querySelector(".line2"),
                    line3: this.shadowRoot.querySelector(".line3"),
                    socialLine: this.shadowRoot.querySelector(".socialLine"),
                    cross: this.shadowRoot.querySelector(".cross")
                }
                
                if (this.els.info) this.els.info.addEventListener("click", () => {
                    if (this.els.trackBox.style.top === '0px')
                    {
                        this.pause();
                        setTimeout(() => {
                            this.els.wrapper.style.overflow = "hidden"
                            this.els.wrapper.style.position = "relative"
                            this.els.wrapper.style.height = "86px"
                            this.els.wrapper.style.top = "50%"
                            this.els.wrapper.style.left = "50%"
                            this.els.wrapper.style.transform = "translate(-50%, -50%)"
                            this.els.hideBlock.style.display = "block"
                            this.els.trackBox.style.transform = "translate(130px, -50%)"
                            this.els.trackBox.style.left = "-100%"
                            this.els.progressBox.style.transform = "translate(130px, -50%)"
                            this.els.progressBox.style.left = "-100%"
                            this.els.infoBlock.style.display = "flex"
                            setTimeout(() => {
                                
                                this.els.infoBlock.style.width = "calc(100% - 120px)"
                                this.els.infoBlock.style.paddingLeft = "25px"
                                this.els.infoBlock.style.paddingRight = "10px"
                                setTimeout(() => {
                                    this.els.titleLine.style.opacity = "1"
                                    this.els.textarea.style.opacity = "1"
                                }, 300);    
                               
                            }, 300);
                        }, 300);
                    }
                    else {
                        this.els.wrapper.style.overflow = "hidden"
                        this.els.wrapper.style.position = "relative"
                        this.els.wrapper.style.height = "86px"
                        this.els.wrapper.style.top = "50%"
                        this.els.wrapper.style.left = "50%"
                        this.els.wrapper.style.transform = "translate(-50%, -50%)"
                        this.els.hideBlock.style.display = "block"
                        this.els.trackBox.style.transition = "0.3s linear"
                        this.els.trackBox.style.transform = "translate(130px, -50%)"
                        this.els.trackBox.style.left = "-100%"
                        this.els.progressBox.style.transform = "translate(130px, -50%)"
                        this.els.progressBox.style.transition = "0.3s linear"
                        this.els.progressBox.style.left = "-100%"
                        this.els.infoBlock.style.display = "flex"
                        setTimeout(() => {
                            
                            this.els.infoBlock.style.width = "calc(100% - 120px)"
                            this.els.infoBlock.style.paddingLeft = "25px"
                            this.els.infoBlock.style.paddingRight = "10px"
                            setTimeout(() => {
                                this.els.titleLine.style.opacity = "1"
                                this.els.textarea.style.opacity = "1"
                            }, 300);    
                           
                        }, 300);   
                    }
                     
                });

                if (this.els.cross) this.els.cross.addEventListener("click", () => {
                    this.els.infoBlock.style.width = "0"
                    this.els.infoBlock.style.paddingLeft = "0"
                    this.els.infoBlock.style.paddingRight = "0"
                    this.els.titleLine.style.opacity = "0"
                    this.els.textarea.style.opacity = "0"
                    
                    setTimeout(() => {
                        this.els.trackBox.style.transition = "0.3s linear"
                        this.els.trackBox.style.transform = "translate(-50%, -50%)"
                        this.els.trackBox.style.left = "50%"
                        this.els.trackBox.style.top = "50%"
                        this.els.progressBox.style.transform = "translate(-50%, -50%)"
                        this.els.progressBox.style.transition = "0.3s linear"
                        this.els.progressBox.style.left = "50%"
                        this.els.progressBox.style.top = "50%"
                        this.els.infoBlock.style.display = "none"
                        
                        setTimeout(() => {
                            this.els.wrapper.style.position = "auto"
                            this.els.wrapper.style.height = "100%"
                            this.els.wrapper.style.overflow = "visible"
                            this.els.hideBlock.style.display = "none"
                            if (this.isPlayed) {
                                var id = this.shadowRoot.querySelector(".player").id.split('id__')[1]
                                if (document.getElementById(id) != null) { document.getElementById(id).style.top = this.shadowRoot.querySelector(".player").getAttribute("uptop")}
                                this.els.play.style.display = "none"
                                this.els.pause.style.display = "flex"
                                this.shadowRoot.querySelector(".track-box").style.transition = "0.3s linear"
                                this.shadowRoot.querySelector(".track-box").style.top = "0"
                                this.shadowRoot.querySelector(".track-box").style.transform = "translate(-50%, 0%)"
                                this.shadowRoot.querySelector(".track-box").style.boxShadow = "0 1px 5px rgba(0,0,0,0.2)"
                                this.shadowRoot.querySelector(".progress-box").style.transition = "0.3s linear"
                                this.shadowRoot.querySelector(".progress-box").style.top = "100%"
                                this.shadowRoot.querySelector(".progress-box").style.transform = "translate(-50%, -100%)"
                            }
                        }, 300);          
                    }, 300);   
                });


                this.els.dwnld.addEventListener("mouseenter", () => {
                    if (this.els.dwnld.getAttribute('type') === 'gray') {
                        this.els.corner2.style.opacity = '1';
                        this.els.reg.style.opacity = '1';
                        
                    }
                });

                this.els.dwnld.addEventListener("mouseleave", () => {
                    if (this.els.dwnld.getAttribute('type') === 'gray') {
                        this.els.corner2.style.opacity = '0';
                        this.els.reg.style.opacity = '0';
                    }
                });

                if (this.els.menu) this.els.menu.addEventListener("click", () => {
                    if (this.els.soc_icon.style.opacity == '1' || !this.els.soc_icon.style.opacity) {
                        this.els.soc_icon.style.opacity = 0;
                        this.els.menu_cross.style.opacity = 1;
                        this.els.line2.style.opacity = '0';
                        this.els.line3.style.opacity = '0';
                        setTimeout(() => {
                            this.els.line2.style.display = 'none';
                            this.els.line3.style.display = 'none';
                            this.els.socialLine.style.display = 'flex';
                            this.els.socialLine.style.opacity = '1';
                        }, 200);
                    }
                    else {

                        this.els.soc_icon.style.opacity = 1;
                        this.els.menu_cross.style.opacity = 0;
                        this.els.socialLine.style.opacity = '0';
                        setTimeout(() => {
                            this.els.socialLine.style.display = 'none';
                            this.els.line2.style.display = 'flex';
                            this.els.line2.style.opacity = '1';
                            this.els.line3.style.display = 'flex';
                            this.els.line3.style.opacity = '1';
                        }, 200);
                    }
                });

                this.els.play.addEventListener("click", () => {
                    this.play()
                });

                this.els.pause.addEventListener("click", () => {
                    this.pause()
                });

                this.els.progress.addEventListener("input", () => {
                    this.moveTo(this.els.audio.duration * this.els.progress.value / 1000)
                }, false);

                this.els.audio.onended =  () => {
                    this.onEnd()
                };

                this.timeout = false
                this.isPlayed = false
            }
        }

        play = () => {
            if (this.els.trackBox.style.left == '-100%') {
                this.els.infoBlock.style.width = "0"
                this.els.infoBlock.style.paddingLeft = "0"
                this.els.infoBlock.style.paddingRight = "0"
                this.els.titleLine.style.opacity = "0"
                this.els.textarea.style.opacity = "0"
                
                setTimeout(() => {
                    this.els.trackBox.style.transition = "0.3s linear"
                    this.els.trackBox.style.transform = "translate(-50%, -50%)"
                    this.els.trackBox.style.left = "50%"
                    this.els.trackBox.style.top = "50%"
                    this.els.progressBox.style.transform = "translate(-50%, -50%)"
                    this.els.progressBox.style.transition = "0.3s linear"
                    this.els.progressBox.style.left = "50%"
                    this.els.progressBox.style.top = "50%"
                    this.els.infoBlock.style.display = "none"
                    
                    setTimeout(() => {
                        this.els.wrapper.style.position = "auto"
                        this.els.wrapper.style.height = "100%"
                        this.els.wrapper.style.overflow = "visible"
                        this.els.hideBlock.style.display = "none"
                        if (this.isPlayed) {
                            var id = this.shadowRoot.querySelector(".player").id.split('id__')[1]
                            if (document.getElementById(id) != null) { document.getElementById(id).style.top = this.shadowRoot.querySelector(".player").getAttribute("uptop")}
                            this.els.play.style.display = "none"
                            this.els.pause.style.display = "flex"
                            this.shadowRoot.querySelector(".track-box").style.transition = "0.3s linear"
                            this.shadowRoot.querySelector(".track-box").style.top = "0"
                            this.shadowRoot.querySelector(".track-box").style.transform = "translate(-50%, 0%)"
                            this.shadowRoot.querySelector(".track-box").style.boxShadow = "0 1px 5px rgba(0,0,0,0.2)"
                            this.shadowRoot.querySelector(".progress-box").style.transition = "0.3s linear"
                            this.shadowRoot.querySelector(".progress-box").style.top = "100%"
                            this.shadowRoot.querySelector(".progress-box").style.transform = "translate(-50%, -100%)"
                        }
                    }, 300);          
                }, 300);   
            }
            var id = this.shadowRoot.querySelector(".player").id.split('id__')[1]
            if (document.getElementById(id) != null) { document.getElementById(id).style.top = this.shadowRoot.querySelector(".player").getAttribute("uptop")}
            this.isPlayed = true
            this.els.audio.play()
            this.els.play.style.display = "none"
            this.els.pause.style.display = "flex"
            this.shadowRoot.querySelector(".track-box").style.transition = "0.3s linear"
            this.shadowRoot.querySelector(".track-box").style.top = "0"
            this.shadowRoot.querySelector(".track-box").style.transform = "translate(-50%, 0%)"
            this.shadowRoot.querySelector(".track-box").style.boxShadow = "0 1px 5px rgba(0,0,0,0.2)"
            this.shadowRoot.querySelector(".progress-box").style.transition = "0.3s linear"
            this.shadowRoot.querySelector(".progress-box").style.top = "100%"
            this.shadowRoot.querySelector(".progress-box").style.transform = "translate(-50%, -100%)"
            var min = Math.floor(this.shadowRoot.querySelector(".audio").duration/60);
            var sec = Math.round(this.shadowRoot.querySelector(".audio").duration-min*60);
            var time = min + ':' + sec;
            this.shadowRoot.querySelector(".audioDuration").textContent = time;
            this.timeout = setInterval(() => {
                this.updateProgress()
            }, 100);

            this.dispatchEvent(new CustomEvent('onPlay', {
                bubbles: true,
                composed: true,
                detail: "composed"
            }));
        }

        pause = () => {
            this.isPlayed = false
            this.els.audio.pause()
            this.els.pause.style.display = "none"
            this.els.play.style.display = "flex"
            this.shadowRoot.querySelector(".track-box").style.top = "50%"
            this.shadowRoot.querySelector(".track-box").style.transform = "translate(-50%, -50%)"
            this.shadowRoot.querySelector(".track-box").style.boxShadow = "none"
            this.shadowRoot.querySelector(".progress-box").style.top = "50%"
            this.shadowRoot.querySelector(".progress-box").style.transform = "translate(-50%, -50%)"
            this.updateProgress()
            clearInterval(this.timeout)
            var id = this.shadowRoot.querySelector(".player").id.split('id__')[1]
            if (document.getElementById(id) != null) { document.getElementById(id).style.top = this.shadowRoot.querySelector(".player").getAttribute("lowtop") }
        }

        onEnd = () => {
            this.dispatchEvent(new CustomEvent('onEnd', {
                bubbles: true,
                composed: true,
                detail: "composed"
            }));
        }

        updateProgress = () => {
            this.els.progress.value = Math.floor(this.els.audio.currentTime / this.els.audio.duration * 1000);
            var min = Math.floor(this.els.audio.currentTime/60);
            var sec = Math.round(this.els.audio.currentTime-min*60);
            if (sec<10) sec = '0' + sec;
            var time = min + ':' + sec;
            this.shadowRoot.querySelector(".currentTime").textContent = time;
            this.shadowRoot.querySelector(".progressline").style.width =  this.els.progress.value/10 + "%";
            this.shadowRoot.querySelector(".progressthumb").style.left =  this.els.progress.value/10 + "%";
        }

        moveTo = (value) => {
            this.els.audio.currentTime = value;
            var min = Math.floor(value/60);
            var sec = Math.round(value-min*60);
            if (sec<10) sec = '0' + sec;
            var time = min + ':' + sec;
            this.shadowRoot.querySelector(".currentTime").textContent = time;
        }
    }

    customElements.define('r-player', RPlayer);
})