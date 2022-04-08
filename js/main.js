$(".navbar a, .showrooms a, .description button, .footer a, .popup__feedback-btn").on("click", function(){
  $("body,html").animate({
   scrollTop:$("#" + $(this).data('value')).offset().top
  },1000)
  
 })

 $('.hero-title').on('mousewheel', function(e){
  console.log(e.originalEvent.deltaY)
   if(e.originalEvent.deltaY > 0) {
     console.log(e.originalEvent.deltaY)
    $('.hero, .content').addClass('scrolled');
    return false
  }
});
	

 $('.hero .sd, .navbar a').on('click', function(){
	$('.hero, .content').addClass('scrolled');
});

$('.hero-main').on('mousewheel', function(e){
	if( $('.hero.scrolled').length ){
		if( $(window).scrollTop() == 0 && e.originalEvent.deltaY < 0) {
			$('.hero, .content').removeClass('scrolled');
		}
	}
});

let slider = document.querySelector('.slider'),
  sliderList = slider.querySelector('.slider-list'),
  sliderTrack = slider.querySelector('.slider-track'),
  slides = slider.querySelectorAll('.slide'),
  arrows = slider.querySelector('.slider-arrows'),
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /([-0-9.]+(?=px))/,
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === --slides.length);
  },
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    // определение действия свайп или скролл
    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      // запрет ухода влево на первом слайде
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет ухода вправо на последнем слайде
      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет протаскивания дальше одного слайда
      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }

      // двигаем слайд
      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function() {
  let target = event.target;

  if (target.classList.contains('next')) {
    slideIndex++;
  } else if (target.classList.contains('prev')) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});

//open popup
var cur=0, id=0, min =0, max=0;
$('.card').on('click', function() {
  $('.popup').addClass('popup_opened');
  id = parseInt($(this).data("id"));cur = 0;
  
  $('.popup__image').attr('src', productArr[id][cur]['url']);
  $('.popup__title').html(productArr[id][cur]['title']);
  $('.popup__description').html(productArr[id][cur]['description']);
  max = productArr[id].length;
})

$('.popup__feedback-btn').on('click', function(){
  $('.popup').removeClass('popup_opened')
})

//Close popup
$('.popup__close-button').on('click', function() {
  $('.popup').removeClass('popup_opened')
})

//previous button
$('.popup__prv-button').on('click', function() {
  if (cur>min){
    cur--;
    $('.popup__image').attr('src', productArr[id][cur]['url']);
    $('.popup__title').html(productArr[id][cur]['title']);
    $('.popup__description').html(productArr[id][cur]['description']);
  }
})

//next button
$('.popup__nxt-button').on('click', function() {
  if (cur<max-1){
    cur++;
    $('.popup__image').attr('src', productArr[id][cur]['url']);
    $('.popup__title').html(productArr[id][cur]['title']);
    $('.popup__description').html(productArr[id][cur]['description']);
  }
})

var productArr = [

  [ // category 1
    { // product 1
      url: './images/products/CollaborativeSpaces/space1.jpg',
      title: 'Office workstation',
      description: 'Intelligent system made of frames and storage elements that can be merged with workplace desks (T-Workstation, T-Lift Desk, Lift Desk Pure) to form well-organised workstations. In addition to having structural functions, the frame is also a formative and striking design.'
    },
    { // product 2
      url: './images/products/CollaborativeSpaces/space2.jpg',
      title: 'FLOW | Office workstation',
      description: 'Flow collection is not just a system of height-adjustable desks but is much more. Operative Flow is a complete system consisting of a fully electrifiable bench to which various elements can be aggregated such as fixed or height-adjustable desks, cushions, coffee tables, informal meeting tables, cabinets and TV stand.'
    },
    { // product 3
      url: './images/products/CollaborativeSpaces/space3.jpg',
      title: 'VERTEBRA',
      description: 'The “Central Spine Systems”, that are those systems provided with a central container element to whom the desks are connected perpendicularly, are here represented by the Vertebra collection. Vertebra can be single sided ora double sided, fully cablable because cables run along the skirting and exit through the grommet on container top.'
    },
    { // product 4
      url: './images/products/Cafe&dining/dining.jpg',
      title: 'BRIDGE',
      description: 'Bridge, an elegant yet informal furnishing line that blends modernity with industrial classic style, able to adapt to locations and convey a strong emotional charge. Bridge expresses the art of bar furnishing with genuine italian-made taste, the Frigomeccanica way. The vast range of materials, colours and finishes enables the creation of interiors and moods with infinite combinations.'
    },
    { // product 5
      url: './images/products/Cafe&dining/dining2.jpg',
      title: 'CONTAINER',
      description: 'Illuminated steel bar counter, a furnishing line with personality. Original and colourful, rugged and reliable, in steel for durability over time. The ornamental handle is finished in corten colour, black, or the front panel colour. Led lighting is supplied as standard.'
    },
    { // product 6
      url: './images/products/Cafe&dining/dining3.jpg',
      title: 'MODERN',
      description: 'This is stainless steel and wood bar counter.The tubular aluminium structure is clad in wood, quartz and light to create a bar counter of simple elegance. Modern is a bar counter with exquisitely uncluttered lines and prestige materials. The wengé wood front combines attrac- tively with the “L” shaped counter-top in quartz agglomerate and the steel plinth.'
    },
    { // product 7
      url: './images/products/Conference&training/conference.jpg',
      title: 'Rectangular conference table',
      description: 'Prestige lines and finishing, modulated shapes and sizes, facilitate collaboration and visual contact; then the various tools needed for electricity, wide and easy-to-check wire management container, make I-meet that perfect environment, for functional and highly representative meetings.'
    },
    { // product 8
      url: './images/products/Conference&training/conference2.jpg',
      title: 'QUARANTA',
      description: 'A complete range. The conference table can measure 240 or 300 centimetres, and features the top access system with two-way opening.Absolute modularity. It is developed following the principles of modular design, which are expressed not only in the dimensions of the desks, storage units and drawer units. The storage units created using the  technique offer perfect volumes, without any visible joins.'
    },
    { // product 9
      url: './images/products/Conference&training/conference3.jpg',
      title: 'CONFERENCE',
      description: 'In the Conference version, the Bralco reception area provides an original and particularly functional viewpoint: it is perfectly wired to manage data outputs and amplification.The perimeter light allows you to concentrate your attention on the speaker’s area, increasing focus and interest.The details suggest and underline the creative care that characterise Bralco reception area solutions.'
    },
    { // product 10
      url: './images/products/CollaborativeSpaces/cubicle.jpg',
      title: 'BRICKS WALL CUBICLE LOW',
      description: 'Bricks Wall is a collection of modular wall systems. Just like sofa Bricks it consists of geometrical shapes in different dimensions. Bricks Wall can be combined with all seating and back elements of Bricks and can be used as a detached sound insulating room divider.'
    },
    { // product 11
      url: './images/products/CollaborativeSpaces/cubicle2.jpg',
      title: 'BRICKS WALL CUBICLE HIGH',
      description: ' Functional supplements, such as folder racks or coat hooks, are optional. Bricks Wall is characterized by an inventive linking system, which can be attached to the outer end of the walls. This makes it very easy to expand or move the walls.'
    },
    { // product 12
      url: './images/products/CollaborativeSpaces/cubicle3.jpg',
      title: 'FRAMERY Q',
      description: 'Framery Q  - Working with PAL office pod is a perfect place for people to have meetings, brainstorming sessions and important one-on-one conversations in private without disturbing the whole office – or the office disturbing you. It is easy to assemble and relocate when necessary.'
    },
    { // product 13
      url: './images/products/CollaborativeSpaces/cubicle13.jpg',
      title: 'CAR010',
      description: 'Trolley with structure in extruded aluminium profiles, shelf and 6 drawers in stove enamelled metal, lateral and back panels in methacrylate. Chromed castors and handles in chromed steel wire.'
    },
    { // product 14
      url: './images/products/CollaborativeSpaces/cubicle14.jpg',
      title: 'COM002',
      description: 'Sideboard with structure in extruded aluminium profiles, shelves and drawers in metal, lateral and back panels in methacrylate.Handles in chromed steel wire and height adjustable feet in grey plastic.'
    },
    { // product 15
      url: './images/products/CollaborativeSpaces/cubicle15.jpg',
      title: 'SID001',
      description: 'Agile and sturdy, the modular supporting structure of the system is made of extruded aluminium profiles, with die-cast elements.'
    },
    { // product 16
      url: './images/products/CollaborativeSpaces/cubicle16.jpg',
      title: 'PARAGRAPH',
      description: 'Paragraph is a storage system designed to be both relevant and productive within the modern workplace. It goes beyond the traditional function of housing the output of work, such as files and folders; it is flexible, architectural and personal.'
    },
    { // product 17
      url: './images/products/CollaborativeSpaces/cubicle17.jpg',
      title: 'BOXIE BXL',
      description: 'System equipped with two drawers, fitted with an integrated handle, and swivelling and lockable wheels.'
    },
    { // product 18
      url: './images/products/CollaborativeSpaces/cubicle18.jpg',
      title: 'OFFICE CABINET',
      description: 'Drawer pedestal created in order to meet top quality and safety requirements. In conformity with DIN and GS safety standards.'
    },
    { // product 19
      url: './images/products/CollaborativeSpaces/cubicle19.jpg',
      title: 'CARGO',
      description: 'Tojo-cargo is an expandable and therefore flexible roll container. It consists of a lower part on rollers and an upper part with handle bar. The add-on modules can be optionally inserted in the desired number between the lower and upper parts.'
    },
    { // product 20
      url: './images/products/CollaborativeSpaces/cubicle20.jpg',
      title: 'SPINNY',
      description: 'Spinny, a drawer unit that continuously changes appearance and looks almost organic, features a series of drawers that rotate up to 180 degrees.'
    },
  ],
  [ // category 2
    { // product 1
      url: './images/products/Desks/desk.jpg',
      title: 'EAMES DESK UNIT EDU',
      description: 'In 1949, Charles and Ray Eames developed an innovative system of freestanding, multifunctional shelves and desks. Similar to the simultaneously constructed Eames House, these designs adhered to the principles of industrial production: the Eames Storage Units (ESU) and the Eames Desk Unit (EDU).'
    },
    { // product 2
      url: './images/products/Desks/desk2.jpg',
      title: 'TREE TABLE',
      description: 'Desk with structure in polished or stove enamelled die-cast aluminium, top in veneered plywood (thickness 25mm). Drawer in plywood.'
    },
    { // product 3
      url: './images/products/Desks/desk3.jpg',
      title: 'EILEEN',
      description: 'The curved wood top that conveys softness to the wood is applied to a light writing desk with drawers and designed to be fitted with the most advanced technologies. Also available with thick leather covered top.'
    },
    { // product 4
      url: './images/products/Desks/desk4.jpg',
      title: 'CREO',
      description: 'Creo desk is characterized by a shelf of 60 or 80 cm wide, on which rests the top of the desk that can also be equipped with a unit of drawers. The aluminum structure, available in black anodized or champagne grinded, is combined with lacquered wood in different colors, and can be customized as needed with open modules, doors or drawers.'
    },
    { // product 5
      url: './images/products/Desks/desk5.jpg',
      title: 'RADICÀL FAKE',
      description: 'For Cappellini, Patricia Urquiola created the sophisticated signature desk, Radicàl Fake – an authentic architectural design.Available in two heights, Radicàl Fake desks are equipped with incorporated bookshelves, formed by the intersection of different linear elements that create amusing and unexpected perspectives.'
    },
    { // product 6
      url: './images/products/Desks/desk6.jpg',
      title: 'SUA HOME OFFICE',
      description: 'Your home office. Perfect for recreating a work atmosphere in the warmth of the home. Its multiple possible configurations can recreate any layout imagined by the customer. Formal simplicity and the highest quality materials and finishes.'
    },
    { // product 7
      url: './images/products/Desks/desk7.jpg',
      title: 'MACIS',
      description: 'Macis was specially designed to respond to the rapid transformations of our time. A table or a desk? Support surface, workstation, study desk, leisure space, a space for sharing: Macis is the unique and versatile solution for the multiple demands of daily living.'
    },
    { // product 8
      url: './images/products/Desks/desk8.jpg',
      title: 'Height-adjustable writing desk',
      description: 'Table is available in a wide range of colors and surfaces: powdercoated MDF (medium-density fibreboard), back lacquered clear class, back lacquered etched glass, transparent glass, granite, linoleum, laminate as well as in oiled and lacquered veneer.'
    },
    { // product 9
      url: './images/products/Desks/desk9.jpg',
      title: 'CLAPET',
      description: 'The TOLIX® Flap Desk, imagined by Sebastian Bergne, is the ideal size for small spaces. Store documents and pens out of sight beneath its two flaps. There is also a hole in the back for cables.Writing desk - Indoor finishes: Painted. Options: Multifinish.'
    },
    { // product 10
      url: './images/products/Desks/desk10.jpg',
      title: 'PAPER DESK',
      description: 'Paper desk - writing desk Have you ever dreamt of a classic-looking desk made of white paper and cardboard? Material: Wood and cardboard finished with paper and polyurethane (PU) lacquer; Oak veneer top Additional: Both sizes are available in White, 23 RAL Colours or as Patchwork; Top always oak veneer.'
    },
    { // product 11
      url: './images/products/Desks/desk11.jpg',
      title: 'V031',
      description: 'V031 - Writing desk  characterised by great aesthetic appeal and is highly practical. It has a Venice briar top with a glossy finish and edges with a Skin Sand leather finish, embellished with tone-on-tone stitching. It is fitted with a front drawer in wood and an aluminium and LED lamp, placed at the opposite end. The legs, elegant and rather minimal, are in black metal with a glossy finish.'
    },
    { // product 12
      url: './images/products/Desks/desk12.jpg',
      title: 'FRAME',
      description: 'Frame by Ersa is a desk made with a metal frame and veneered top. Thanks to its lighting fixture which can be added to workstations, dividing panel and shelf unit, Frame offers a multifunctional desk experience, lighting fixture, and storage solution all together.'
    },
    { // product 13
      url: './images/products/Desks/desk13.jpg',
      title: 'TRESTLE',
      description: 'Designed in 1978, Trestle utilises a simple design to create a sophisticated desk.Powder coated steel legs are available to buy as either a standaolne set or a combined with one of two top options to form a complete desk.'
    },
    { // product 14
      url: './images/products/Desks/desk14.jpg',
      title: 'ELEVADO DESK',
      description: 'The elegantly scaled ELEVADO DESK has a simple architectural silhouette and utilizes our signature ivory cerused and wire brushed Wenge finish. Below the expansive desk top, which is framed in beautiful cathedral grain cut Wenge, lies a pair of delicate, linen lined drawers with pencil tray detailing and wooden glides.'
    },
    { // product 15
      url: './images/products/Desks/desk15.jpg',
      title: 'FIVE',
      description: 'FIVE is a writing desk in bent fumé glass.'
    },
    { // product 16
      url: './images/products/Desks/desks16.jpg',
      title: 'MOMENTS',
      description: 'MOMENTS is a walnut with Emperador marble base coffee table. The smooth rotating movement of the two circular tops gives its name to this unique side table.'
    },
    { // product 17
      url: './images/products/Desks/desks17.jpg',
      title: 'BAKKES',
      description: 'This unique end table for indoor and outdoor use will make your favourite plant shine. The plant pot is positioned off to one side, leaving plenty of room for your drink or snacks.'
    },
    { // product 18
      url: './images/products/Desks/desks18.jpg',
      title: 'TAULA',
      description: 'The Taula table collection was inspired by the imposing monolithic structures of the same name that are found on the Mediterranean islands of Menorca and Mallorca.'
    },
    { // product 19
      url: './images/products/Desks/desks19.jpg',
      title: 'MERIAN',
      description: 'MERIAN is an innovative coffee table made from nuanced silkscreen-printed glass with finishing touches on the glass in a colourway which makes it elegant and extremely versatile.'
    },
    { // product 20
      url: './images/products/Desks/desks20.jpg',
      title: 'ECO',
      description: 'Eco is a set of small tables in solid scented cedar, available in two diameters, machined from a section of a tree trunk, highlighting the typical concentric rings of the tree.'
    },
  ],
  [ // category 3
    { // product 1
      url: './images/products/Chairs/chair.jpg',
      title: 'MONZA',
      description: 'Armchair, massive iroko wooden structure, oil treated. Backrest in polypropylene in the colours black, cafe latte, caramel, terra brown. Outdoor and Indoor use.'
    },
    { // product 2
      url: './images/products/Chairs/chair2.jpg',
      title: 'EMILIA ',
      description: 'Emilia is an upholstered chair with removable cover, fixed for the leather version. It has a structure in solid ash in black - tobacco - white stained finishes or in matt or glossy lacquered solid beech, seat padded with polyurethane foam in different densities and fiber, upholstery with enlarged double stitching only for the leathers of the collection.'
    },
    { // product 3
      url: './images/products/Chairs/chair3.jpg',
      title: 'BUFFALO',
      description: 'With rich wood grain, the Buffalo Chair has a distinctive appearance to match its high-quality, solid-wood construction.The back is made with a special production technique pressing multiple layers of oak veneer in a compression mold, forming the characteristic buffalo horn shape that provides back and arm support.'
    },
    { // product 4
      url: './images/products/Chairs/chair4.jpg',
      title: 'BOHEME',
      description: 'Created using the bentwood technique, the backrest of this light-weight armchair delicately rests between the two side structures. The fluidity created by the solid and open materials is emphasised by rattan caning (or other finishes). It has the perfect amount of retro inspiration.'
    },
    { // product 5
      url: './images/products/Chairs/chair5.jpg',
      title: 'ALLY',
      description: 'ALLY is a steel wire sled armchair, with soft and light lines. It can be suitable for furnishing outdoor environments such as terraces or gardens or for interior design. The metal structure has curved backrest and armrests that lighten and give dynamism to the whole shape.'
    },
    { // product 6
      url: './images/products/Chairs/chair6.jpg',
      title: 'VIA VENETO',
      description: 'The Via Veneto seat is inspired by the 1960s andrecalls the atmosphere of the Roman dolce vita. The double symmetrical tubular structure in painted  stainless steel designs the feet and armrests, which support the soft leather upholstered seat and the small shaped metal backrest.'
    },
    { // product 7
      url: './images/products/Chairs/chair7.jpg',
      title: 'TUGU',
      description: 'Tugu is a dining chair with aluminium powder coated frame, enclosed in hand woven wicker 6 mm. All cushions are filled with all weather foam. An advanced, high performance foam, developed for outdoor applications.'
    },
    { // product 8
      url: './images/products/Chairs/chair8.jpg',
      title: 'NANA',
      description: 'Clear lines gently rendered: the Nana chair is the symbiosis of inimitable softness and straightforward design vocabulary with no frills. A chair that pays homage to the art of furniture upholstery while catching the eye with its elegance and finesse, despite its voluminous looks.'
    },
    { // product 9
      url: './images/products/Chairs/chair9.jpg',
      title: 'ALOA',
      description: 'Lightness redefined. Aloa is a simple and elegant family of chairs and bar stools with an upholstered seat and back, supported by a graphic metal frame. Highly comfortable, Aloa fits perfectly around a dining table, at a restaurant or a meeting setting at the office.'
    },
    { // product 10
      url: './images/products/Chairs/chair10.jpg',
      title: 'SPINDLE',
      description: 'Extremely resistant, stackable, equally suitable for workplaces, homes and communities, Spindle is made of extra – small section chromium–plated wire.'
    },
    { // product 11
      url: './images/products/Chairs/chair11.jpg',
      title: 'HARMONY',
      description: 'The Harmony chair backrest structure is in iron and cold moulded polyurethane foam. The seat base is in wood with elastic bands covered in multi-thickness polyurethane foam. The upholstery is glued to the frame and therefore non-removable.'
    },
    { // product 12
      url: './images/products/Chairs/chair12.jpg',
      title: 'FOSCA',
      description: 'Fosca is a chair with back and seat in curved ash and legs in black lacquered metal. The wood finish can be natural or black. It has an integrated seat cushion.'
    },
    { // product 13
      url: './images/products/Chairs/chair13.jpg',
      title: 'DS-515',
      description: 'Slim, light and of simple elegance: DS-515 presents itself as an unconventional upholstered chair, designed by the design duo Greutmann Bolzern. The refined sub construction, the slender upholstery and the leather workmanship in its highest perfection, give already a hint to the high seating comfort.'
    },
    { // product 14
      url: './images/products/Chairs/chair14.jpg',
      title: 'ELLA',
      description: 'Ella is a chair with armrests, entirely handmade in polycarbonate. It is supported by a pedestal that allows rotation which stem is black and the petals of transparent and soft hues mix green and blue or gold or anthracite, recalls the shape of a flower.'
    },
    { // product 15
      url: './images/products/Chairs/chair15.jpg',
      title: 'DS-515',
      description: 'Slim, light and of simple elegance: DS-515 presents itself as an unconventional upholstered chair, designed by the design duo Greutmann Bolzern. The refined sub construction, the slender upholstery and the leather workmanship in its highest perfection, give already a hint to the high seating comfort.'
    },
    { // product 16
      url: './images/products/Chairs/chair16.jpg',
      title: 'SISSI',
      description: 'Stackable armchair (4 pieces). Monobloc in copolymer polypropylene with glass fiber in matt titanium color metallic finish.Indoor/outdoor use.'
    },
    { // product 17
      url: './images/products/Chairs/chair17.jpg',
      title: 'ROSE',
      description: 'ROSE is a handcrafted dining chair. Slim crossed solid ash wood legs and a curved backrest with rich pillows create a sophisticated silhouette that makes this chair a modern classic. Bringing a sense of sophistication and sleek design, it effortlessly combines modern elements with vintage styling.'
    },
    { // product 18
      url: './images/products/Chairs/chair18.jpg',
      title: 'GRAY 22',
      description: 'Gray 22 is the chair, frame in walnut or oak. Available wood finishes: natural lacquered American walnut; bleached oak; white, grey, black, ocean or dove-gray lacquered oak. Upholstered back, not removable cover. Available in all fabrics except 3D.'
    },
    { // product 19
      url: './images/products/Chairs/chair19.jpg',
      title: 'PIANO DESIGN',
      description: 'Piano Design is a chair entirely made from solid wood.'
    },
    { // product 20
      url: './images/products/Chairs/chair20.jpg',
      title: 'NAIMA By Riva',
      description: 'Naima is a chair with solid wood seat in a continuous line between the back and the armrests, also available with revolving base.'
    },
  ],
  [ // category 4
  { // product 1
    url: './images/products/Office-chairs/office_chair.jpg',
    title: 'KINESIT MET',
    description: 'Kinesti Met is a chair with powder coated aluminum 5 way swivel base on self-braking castors  (black, available for hard and soft floors), fitted with gas-lift mechanism for height adjustment. Seat with built-in self-tensioning weight response mechanism, backrest with 3-position recline, adjustable lumbar support breathing up to 60 mm.'
  },
  { // product 2
    url: './images/products/Office-chairs/office_chair2.jpg',
    title: 'SE:MOTION',
    description: 'Se: motion is a height-adjustable office chair with 5-spoke base with armrests. Available in light grey and black version.'
  },
  { // product 3
    url: './images/products/Office-chairs/office_chair3.jpg',
    title: 'REYNET 1653',
    description: 'Reynet - Monocoque seats with white or black technopolymer structure, breathable elastic mesh with grey/white or black memory that automatically and ergonomically conforms to the various postures of the individual users. Two backrest heights are available.'
  },
  { // product 4
    url: './images/products/Office-chairs/office_chair4.jpg',
    title: 'FLEX EXECUTIVE',
    description: 'Low back armchair with upholstered shell and aluminum swivel four-starbase with self-return and finished in polished aluminum, white or black. Additional options include: parallel upholstery stitching, tilt mechanism and back finished in walnut veneer.'
  },
  { // product 5
    url: './images/products/Office-chairs/office_chair5.jpg',
    title: 'LOUNGE 91',
    description: 'Relax. Meet. Communicate. Where people meet, communicate or simply relax, our new lounge furniture items lounge 91 and lounge 92 can be found. With their dynamic design, they complete your individual space at home as well as your work environment. Various individual color choices for shell upholstery and seating cushion are are available upon request and put you in a good mood.'
  },
  { // product 6
    url: './images/products/Office-chairs/office_chair6.jpg',
    title: 'CODY',
    description: 'Task chair with mesh backrest. Structure of black color. Seat upholstered in fabric, imitation leather or leather. Oscillating mechanism with 4 locking positions 1D adjustable armrests. 5-star base in black nylon. 50mm rubber wheels'
  },
  { // product 7
    url: './images/products/Office-chairs/office_chair7.jpg',
    title: 'SINA',
    description: 'Two curved forms combine to create an elegant compact armchair for meeting and breakout applications. Available in fixed and adjustable height versions in fabric and leather.'
  },
  { // product 8
    url: './images/products/Office-chairs/office_chair8.jpg',
    title: 'COCKPIT',
    description: 'Cockpit is an office chair with 5-Spoke base, Executive model, by Poltrona Frau, in collaboration with the Ferrari Design Center.'
  },
  { // product 9
    url: './images/products/Office-chairs/office_chair9.jpg',
    title: 'INCISA',
    description: 'It is an office chair that captures the excitement, speed and dynamism of the driver’s seat. It manages to convey the gratifying perception of the way the driver’s movements and posture are supported by the backrest and seat..'
  },
  { // product 10
    url: './images/products/Office-chairs/office_chair10.jpg',
    title: 'DALIA',
    description: 'Task swivel armchair with 5 ways base in lacquered steel. Chair fitted with gas mechanism for height adjustment. Shell upholstered in leather, ecoleather, fabric or custom\'s fabric.'
  },
  { // product 11
    url: './images/products/Office-chairs/office_chair11.jpg',
    title: 'AC 5 WORK',
    description: 'The elegant office swivel chair AC 5 Work is equipped with a range of sophisticated functions that not only guarantee healthy seating comfort, but are also discreetly out of sight.'
  },
  { // product 12
    url: './images/products/Office-chairs/office_chair12.jpg',
    title: 'ALYA EXECUTIVE',
    description: 'High back armchair with upholstered seat and back and Eco thermo-polymer central base with 5 casters, swivel and pneumatic height adustment, finished in black.'
  },
  { // product 13
    url: './images/products/Office-chairs/office_chair13.jpg',
    title: 'AM CHAIR',
    description: 'The AM Chair is the combined result of engineering skill, quality design and experience. It unites ergonomic functionality with technical elegance.'
  },
  { // product 14
    url: './images/products/Office-chairs/office_chair14.jpg',
    title: 'SC1023',
    description: 'SC1023 -  Small armchair with base mounted on five casters.Leather or fabric upholstery. Matt black or chromed steel finish.'
  },
  { // product 15
    url: './images/products/Office-chairs/office_chair15.jpg',
    title: 'ALYA EXECUTIVE',
    description: 'Wider version. High back armchair with upholstered seat and back and aluminum swivel 4-star base with self-return and finished in poished aluminun, white or black.'
  },
  { // product 16
    url: './images/products/Office-chairs/office_chair16.jpg',
    title: 'FORUM',
    description: 'Forum is an upholstered leather executive chair with 5-spoke base with castors by Poltrona Frau.'
  },
  { // product 17
    url: './images/products/Office-chairs/office_chair17.jpg',
    title: 'UNIX CHAIR',
    description: 'The Unix Chair by Antonio Citterio is available with a sturdy five-star base on castors, ideal for studio offices and informal office areas. The height-adjustable, swivel chair comes with a technical knit or fabric cover.'
  },
  { // product 18
    url: './images/products/Office-chairs/office_chair18.jpg',
    title: 'MERIDIANA ',
    description: 'Easychair on soft castors. Polished die-casting aluminum height adjustable structure. Shell available in: polycarbonate white or black color, polycarbonate transparent: clear or smoky grey.'
  },
  { // product 19
    url: './images/products/Office-chairs/office_chair19.jpg',
    title: 'KINESIT MET',
    description: 'Kinesti Met is a chair with powder coated aluminum 5 way swivel base on self-braking castors (black, available for hard and soft floors), fitted with gas-lift mechanism for height adjustment.'
  },
  { // product 20
    url: './images/products/Office-chairs/office_chair20.jpg',
    title: 'ABOUT A CHAIR',
    description: 'The AAC 52 version shares the same distinctive and uncluttered shell as the rest of the About A Chair series.'
  },
  { // product 21
    url: './images/products/Office-chairs/office_chair21.jpg',
    title: 'ABOUT A CHAIR AAC 50 ',
    description: 'The AAC 50 version shares the same distinctive and uncluttered shell as the rest of the About A Chair series.'
  },
  { // product 22
    url: './images/products/Office-chairs/office_chair22.jpg',
    title: ' Office chair with armrests',
    description: 'The .04 office chair is distinctly different in appearance from typical task chairs used in institutional office settings. Thanks to its ergonomic features, however, it remains comfortable even over long periods of sitting, and the unobtrusive design makes it a perfect choice for studios and informal office spaces.'
  },
  ],
  [ // category 5
  { // product 1
    url: './images/products/SleepingArea/bed.jpg',
    title: 'GOLF',
    description: 'Golf is a full master bedroom. A new style, elements, colors and finishes for the bedroom that becomes the central room dedicated to res'
  },
  { // product 2
    url: './images/products/SleepingArea/bed2.jpg',
    title: 'NOTTE',
    description: 'A collection packed with subtle styles which create dynamic contrasts or delicate juxtapositions of beds, wardrobe and bedroom sets. Find the complete master bedroom to best fit your needs.'
  },
  { // product 3
    url: './images/products/SleepingArea/bed3.jpg',
    title: 'PATCHWORK',
    description: 'Patchwork is a hybrid headboard made of fabric padding and wood. The juxtaposition of these two materials is made through an irregular patchwork, realized with hexagonal padded elements inserted into a wooden headboard.'
  },
  { // product 4
    url: './images/products/SleepingArea/bed4.jpg',
    title: 'BORDO',
    description: 'Luxury continental type double bed covered with natural linen bedding, accompanied by a linen rug and a solid ash wood bench. A unique design wall lamp creates ambient lighting for cosy reading in a comfortable low chair or a soft beanbag.'
  },
  { // product 5
    url: './images/products/SleepingArea/bed5.jpg',
    title: 'NOTTE',
    description: 'Patchwork is a hybrid headboard made of fabric padding and wood. The juxtaposition of these two materials is made through an irregular patchwork, realized with hexagonal padded elements inserted into a wooden headboard.'
  },
  { // product 6
    url: './images/products/SleepingArea/bed6.jpg',
    title: 'NOTTE By Febal Casa',
    description: 'A collection packed with subtle styles which create dynamic contrasts or delicate juxtapositions of beds, wardrobe and bedroom sets. Find the complete master bedroom to best fit your needs.'
  },
  { // product 7
    url: './images/products/SleepingArea/bed7.jpg',
    title: 'CONCRETE',
    description: 'Luxury continental type double bed covered with natural linen bedding, accompanied by a linen rug and an oak veneer sideboard that perfectly matches with wall hooks.'
  },
  { // product 8
    url: './images/products/SleepingArea/bed8.jpg',
    title: 'MANHATTAN',
    description: 'Wooden bedroom set.'
  },
  { // product 9
    url: './images/products/SleepingArea/bed9.jpg',
    title: 'NOTTE. / 10',
    description: 'A collection packed with subtle styles which create dynamic contrasts or delicate juxtapositions of beds, wardrobe and bedroom sets. Find the complete master bedroom to best fit your needs.'
  },
  { // product 10
    url: './images/products/SleepingArea/bed10.jpg',
    title: 'ORANGE',
    description: 'Brick orange linen covers the exceptional design continental type bed accompanied by a velour upholstery bench and a functional desk.Linen rug in earthy tones contrasts with a vibrant sideboard and comfy beanbag placed under the homely floor lamp.'
  },
  { // product 11
    url: './images/products/SleepingArea/bed11.jpg',
    title: 'Bedroom set By Cosy',
    description: 'Cozy International designs Made in Italy furniture projects and tailor-made bedroom area for luxury lovers: unique and sophisticated furnishing compositions to meet the needs of contemporary living.'
  },
  { // product 12
    url: './images/products/SleepingArea/bed12.jpg',
    title: 'FLORIDA',
    description: 'FLORIDA bedroom will be an elegant and high quality choice.Functional and ergonomic drawers,nightstand and dresser of FLORIDA bedroom will be providing plentiful storage spaces for clothes and valuables.FLORIDA bedroom’s eye catching design is extraordinarily beatiful for trendy interiors. FLORIDA bedroom is made of black sapele wood with bronzed legs as well.'
  },
  { // product 13
    url: './images/products/SleepingArea/bed13.jpg',
    title: 'NATURAL CHIC MOOD',
    description: 'Symbolic stone, born in a hostile nature but fascinating and exotic. The desert rose stone with its crystalline dress and warm and soft shades inspires a combination of ton-sur-ton sandy nuances which create a relaxing and delicate atmosphere.'
  },
  { // product 14
    url: './images/products/SleepingArea/bed14.jpg',
    title: 'URBAN MOOD',
    description: 'A metropolitan, sophisticated and rigorous mood that stops time in a moment of eternal elegance. This combination explores the black&white colour range through the infinite shades of grey, highlighting shapes with the contrast between light and dark.'
  },
  { // product 15
    url: './images/products/SleepingArea/bed15.jpg',
    title: 'SEA MOOD',
    description: 'The versatility of Caroti’s sectional wardrobes makes them suitable to any bedroom, from children’s to adults, where the main goal is to create a spacious, organized and tidy closet. It can be linear, angular, bridge, by the wall, with doors or sliding doors. All sectional solutions feature a series of sticks, adjustable shelves and drawers and can also be customized.'
  },
  { // product 16
    url: './images/products/SleepingArea/bed16.jpg',
    title: 'CANNES',
    description: 'CANNES by WIEMANN - Bedroom set with dual depth hinged wardrobe in havana and new finish, pebble grey.'
  },
  { // product 17
    url: './images/products/SleepingArea/bed17.jpg',
    title: 'CrossART',
    description: 'Beige seta matt lacquered structure and spacer back panels, with verde sporting matt lacquered side panels.'
  },
  { // product 18
    url: './images/products/SleepingArea/bed18.jpg',
    title: 'SHANGHAI',
    description: 'You\'ll be astonished by the diversity of Shanghai. This VIP range will meet your high expectations in terms of first-class design and a cool look. Countless varieties of wardrobes with revolving doors or sliding doors and functional cabinets – available with glass fronts or mirrored doors – await you. The sidewalls can also be fitted with glass panels to create a complete high-gloss effect.'
  },
  { // product 19
    url: './images/products/SleepingArea/bed19.jpg',
    title: 'L1000',
    description: 'L1000 offers intelligent storage solutions with your design of choice.You choose body, doors, profiles, accents and comfort. Eight body and front colours unveil individual freedom in design - mat ching your taste in paint and veneer. An extensive range of accessories like a clothing lift, shoe basket, trouser and tie holder, assures a rapid introduction of order.'
  },
  { // product 20
    url: './images/products/SleepingArea/bed20.jpg',
    title: 'EVERY DAY ROOM',
    description: 'Much more than a beautiful bed: with its storage bed frame and the unexpected cushion headboard, this model changes your bedroom into a dreaming place.'
  },
  { // product 21
    url: './images/products/SleepingArea/bed21.jpg',
    title: 'ROMANTIC ROOM',
    description: 'Details create the perfect atmosphere. Rosa knob is a true rarity that gives an unforgettable style to the dresser. Available in different treatments, it is perfect combined with shabby chic treatment in Carta da Zucchero colour. Majestic but harmonious, the modular wardrobe is embellished by the decorated side panel. Even the most classic and pure colours become incredibly modern thanks to the craftsmanship of the finishes.'
  },
  { // product 22
    url: './images/products/SleepingArea/bed22.jpg',
    title: 'PENELOPE',
    description: 'The elements and accessories of the Penelope bed group can be freely used for the development of night compositions. For this reason the Penelope bed group differs from the other bed groups in that it is a real modular "system" for sleeping area compositions.'
  },
  { // product 23
    url: './images/products/SleepingArea/bed23.jpg',
    title: 'FLOAT',
    description: 'Lightness and functionality are the distinctive elements of Float bedroom. A minimal boxspring is crossed by a shelf which runs along all the headboard up to the wardrobe. Wardrobe is wall-mounted and embedded of LED illumination at the base, contributing to ease its volume. The resulting effect is a contemporary night ambience where all elements are interconnected and in balance.'
  },
  { // product 24
    url: './images/products/SleepingArea/bed24.jpg',
    title: 'NIGHT',
    description: 'In the world of interior design and contemporary architecture, increasingly characterized by the multiplicity of needs that require custom made work on the project, there is a growing demand to provide new solutions that can be flexible and sustainable at the same time'
  },
  { // product 25
    url: './images/products/SleepingArea/bed25.jpg',
    title: 'LIBERTY',
    description: 'Beige seta matt lacquered structure and spacer back panels, with verde sporting matt lacquered side panels.'
  },
  { // product 26
    url: './images/products/SleepingArea/bed26.jpg',
    title: 'ECLECTIC MOOD',
    description: 'Eclectic dimension. The industrial style with its gray, rust and sugar-paper tones inspired by the cement and aged metal, has a palette of strong impact and personality that gives a relaxed and elegant atmosphere to every home.'
  },
  { // product 27
    url: './images/products/SleepingArea/bed27.jpg',
    title: 'LUX MOOD',
    description: 'Cozy International designs Made in Italy furniture projects and tailor-made bedroom area for luxury lovers: unique and sophisticated furnishing compositions to meet the needs of contemporary living.'
  },
  { // product 28
    url: './images/products/SleepingArea/bed28.jpg',
    title: 'LINEN',
    description: 'This bedroom for two is designed with practicality and beauty in mind - quality foam mattresses and beds meet the individual needs of a person. They are covered with linen sheets and lightweight throws, a common accessory to furnishings, and framed by easy-to-assemble wooden coffee tables and an elegant sideboard. With all these comforts a quality night’s rest is guaranteed.'
  },
  { // product 29
    url: './images/products/SleepingArea/bed29.jpg',
    title: 'GOLF M.105',
    description: 'Golf  is a double bedroom qith Attic wardrobes to fit your needs.'
  },
  { // product 30
    url: './images/products/SleepingArea/bed30.jpg',
    title: 'TIRAMOLLA',
    description: 'Composing to the infinity without limits this is our philosophy base for the TIRAMOLLA project. Through a structure of tubes and aluminium moulds, all your fantastic space mounts as a game, freeing the fantasy with the use of 32 colors, 5 melamines, 10 colors of metal and 6 colors of methacrylates, constructing closets under the beds, the beds over the closets, the bureaus under the beds or over the closets.'
  },
  ],
  [ // category 6
  { // product 21
    url: './images/products/Desks/desk21.jpg',
    title: 'LEATHER DESK',
    description: 'The Leather Game Table is a solid wood desk with a leather inset top and leather drawer linings. Materials: Solid Walnut, Oak, Ash, or Ebonized Ash.'
  },
  { // product 22
    url: './images/products/Desks/desk22.jpg',
    title: 'CARAMBOLA GAME',
    description: 'In 1949, Charles and Ray Eames developed an innovative system of freestanding, multifunctional shelves and desks. Similar to the simultaneously constructed Eames House, these designs adhered to the principles of industrial production: the Eames Storage Units (ESU) and the Eames Desk Unit (EDU).'
  },
  { // product 23
    url: './images/products/Desks/desk23.jpg',
    title: 'MOON',
    description: 'Folding game table with round top diameter 100 cm. The structure is in varnished walnut painted solid wood. Ideal for four or five players. The green gaming cloth is easily replaceable.'
  },
  { // product 24
    url: './images/products/Desks/desk24.jpg',
    title: '250 | Picnic table',
    description: 'Variety of play table, type picnic table. Model from the product range of Encho Enchev – ETE company with a characteristic focus on environmentally friendly lifestyle. The combination of wood, concrete and metal combines practicality, beauty and stability. The wood used to make the seats is FSC certified.'
  },
  { // product 1
    url: './images/products/Desks/desks.jpg',
    title: 'URBAN SM18',
    description: 'URBAN SM18 is the desk with metal legs, splashback, wooden top, 38 mm thickness.'
  },
  { // product 2
    url: './images/products/Desks/desks2.jpg',
    title: 'JULIA',
    description: 'Momocca develops furniture specially designed to create spaces of singular beauty. The care of detail, innovation, versatility and timelessness define the character of all its collections.'
  },
  { // product 3
    url: './images/products/Desks/desks3.jpg',
    title: 'TIMMY FOLDING',
    description: 'The TIMMY family folding version is a handy table, practical to complete supplies with other models of the family. Thanks to its reduced dimensions, only 15 cm height when closed, it’s possible to store and stack it with ease. Its strong and resistant frame make this table secure and safe to use.'
  },
  { // product 4
    url: './images/products/Desks/desks4.jpg',
    title: 'URBAN SM10',
    description: 'URBAN SM10 is the desk with metal legs (X shape) and wooden top (18 mm thickness). Hotel furniture and complete furniture in urban style for service apartments and aparthotels by MOBILSPAZIO.'
  },
  { // product 5
    url: './images/products/Desks/desks5.jpg',
    title: 'ZEUS',
    description: 'URBAN SM10 is the desk with metal legs (X shape) and wooden top (18 mm thickness). Hotel furniture and complete furniture in urban style for service apartments and aparthotels by MOBILSPAZIO.'
  },
  { // product 6
    url: './images/products/Desks/desks6.jpg',
    title: 'BDS',
    description: 'BDS is an elegant desk with metal structure and ash top with decisive and rational geometries that goes well with the concept of the home office and a qualified executive office.'
  },
  { // product 7
    url: './images/products/Desks/desks7.jpg',
    title: 'SOSPESA',
    description: 'The console\'s structure comprises 12 mm extra-clear glass sheets, curved and tempered, connected through stainless steel fitting with a top in precious wood. The desk is equipped with a removable top for the PC. It is delivered disassembled and can be easily assembled at home.'
  },
  { // product 8
    url: './images/products/Desks/desks8.jpg',
    title: 'OAK U DESK',
    description: 'Model Zeus and model Fashion are made in melamine panels with thickness 38mm, anti-scratch and rimmed with ABS on all four sides. Wardrobes door have 4 hinges while drawers guide rails are made in metal with stopping mechanism; rods for hanging clothes are in metal.'
  },
  { // product 9
    url: './images/products/Desks/desks9.jpg',
    title: 'OAK U DESK',
    description: 'Office U table. Under the stairs, on the landing, in a corner of the bedroom or by the window: thanks to the digital evolution, the (home) office takes less space than ever. These discreet simple basic desks are perfect to work at.'
  },
  { // product 10
    url: './images/products/Desks/desks10.jpg',
    title: 'TAIPAN',
    description: 'Taipan, the director’s desk, designed as a luxury item, exuding sophistication and power.'
  },
  { // product 11
    url: './images/products/Desks/desks11.jpg',
    title: 'BUSINESS',
    description: 'Business is a rectangular HPL table. Can also be used as a desk. Available in different finishes and colors. Essential, smart tables which are dimensioned for various but planned functionalities, first of all like a principal furnishing protagonist.'
  },
  { // product 12
    url: './images/products/Desks/desks12.jpg',
    title: 'FREISTELL',
    description: 'As a corner solution with 2 x Tojo Freistell and 1 x Tojo Freistell small: In combination of the two Tojo Freistell tables in different sizes, a wonderful corner solution for the office or home office area can be conjured up. The Tojo-freistell klein is placed in the corner and the two Tojo freistell left and right.'
  },
  { // product 13
    url: './images/products/Desks/desks13.jpg',
    title: 'OSKAR',
    description: 'OSKAR collection diffuses an oriental charm in a modern and simple style. The frames of legs are shown outwardly, supporting the weight of table tops made of various materials. The accuracy of details, proportion, size, and stability introduces a unique power to the collection'
  },
  { // product 14
    url: './images/products/Desks/desks14.jpg',
    title: 'URBAN SM',
    description: 'URBAN SM 02 is a desk with metal structure and two shelves.Hotel furniture and complete furniture in urban style for service apartments and aparthotels by MOBILSPAZIO.'
  },
  { // product 15
    url: './images/products/Desks/desks15.jpg',
    title: 'NEW MANHATTAN',
    description: 'The metal legs, exclusively designed for this collection, serve as both functional and decorative elements; a drawer is conveniently located under the tabletop.'
  },
  { // product 16
    url: './images/products/Desks/desk16.jpg',
    title: 'Q3 PHASE',
    description: 'Single student desk stackable up to 10 units frontally, ideal for training rooms. The desk is equipped with a 10 mm thick anti-scratch HPL laminate worktop, available in black or white. The bench structure is made of steel rod Ø 11 mm duly reinforced on the sides with 11 mm steel rod diagonal bars.'
  },
  { // product 17
    url: './images/products/Desks/desk17.jpg',
    title: 'A1 HOME OFFICE',
    description: 'A1 Home Office is a rectangular glass writing desk.'
  },
  { // product 18
    url: './images/products/Desks/desk18.jpg',
    title: 'MACIS BASE',
    description: 'Macis was specially designed to respond to the rapid transformations of our time. A table or a desk? Support surface, workstation, study desk, leisure space, a space for sharing: Macis is the unique and versatile solution for the multiple demands of daily living.'
  },
  { // product 19
    url: './images/products/Desks/desk19.jpg',
    title: 'APELLE ',
    description: 'Apelle is a writing desk made with steel structure and wooden top. To complete the desk is available the hide drawer and the led lamp applied on the lampshade. The desk is part of the Apelle collection.'
  },
  { // product 20
    url: './images/products/Desks/desk20.jpg',
    title: 'PLANE',
    description: 'Designer Felix Stark’s PLANE design updates the traditional office bureau for the present day. PLANE, objective and elegant in its form, is ideal for working with a laptop, smartphone or similar equipment.'
  },
  ],
  [ // category 7
  { // product 1
    url: './images/products/Kids/kid.jpg',
    title: 'Z476',
    description: 'Combi System: hinged doors wardrobe with Fold groove handle in Elm sand.Domin bookcase.G45: wall unit. Web: bed and desk with wooden legs. Bloom: chair with upholstered pillow.'
  },
  { // product 2
    url: './images/products/Kids/kid2.jpg',
    title: 'BIOWOOD',
    description: 'The Montessori Biowood bed is a fully organic bed made from solid Okumè wood, completely interlocking and treated with ecological coatings.'
  },
  { // product 3
    url: './images/products/Kids/kid3.jpg',
    title: 'ALTEA BOOK STANDARD',
    description: 'Altea Book Standard is a transforming system with a foldaway single or intermediate bed, patented CF09 slatted bed base, with a fold-down opening mechanism and safety device that prevents accidental opening and closing.'
  },
  { // product 4
    url: './images/products/Kids/kid4.jpg',
    title: 'MARIA By DAM',
    description: 'Maria is a bedside table that explores the genre issue and has a human and humoristic character. The lampshade represents a women straw hat, typical of the Portuguese region of Baixo Minho. The handles accentuate the humorist intention of the piece because Maria speaks too much.'
  },
  { // product 5
    url: './images/products/Kids/kid5.jpg',
    title: 'SURFY',
    description: 'The Surfy bookcase has a light structure, so it can also work effortlessly as a room divider! It comes in six different configurations: tall or low, with straight or curved side panel. And you can even fit its tall version with the mirror!'
  },
  { // product 6
    url: './images/products/Kids/kid6.jpg',
    title: 'PRINCE SANTI',
    description: 'Prince Santi Bed is a upholstered cot with a wood base with glossy finish. Designed for the little princes and princesses, the Prince Santi Bed provides comfort and safety to the baby. The upholstery is fluffy and soft and is lined with 100% cotton velvet. The Prince Santi Bed is luxurious and timeless. The base is available in gold, copper and silver leaf coated wood with glossy or matte finish. and all RAL/NCS colors, in glossy or matte finish.'
  },
  { // product 7
    url: './images/products/Kids/kid8.jpg',
    title: 'KC306',
    description: 'Tugu is a dining chair with aluminium powder coated frame, enclosed in hand woven wicker 6 mm. All cushions are filled with all weather foam. An advanced, high performance foam, developed for outdoor applications.'
  },
  { // product 8
    url: './images/products/Kids/kid7.jpg',
    title: 'LATTICE',
    description: 'The latex mattress for children, 10,5 cm thick, provides the kid with an ergonomic support, thus guaranteeing the body the right ventilation. It is lined with an organic cotton or cotton and hemp blend cover, both GOTS certified and completely removable.'
  },
  { // product 9
    url: './images/products/Kids/kid9.jpg',
    title: 'PRINCE SANTI | Cradle',
    description: 'Prince Santi Rocking Cradle is a upholstered cradle with a wood base with glossy finish. Designed for the little princes and princesses, the Prince Santi Rocking Cradle provides comfort and safety to the baby. The upholstery is fluffy and soft and is lined with 100% cotton velvet.'
  },
  { // product 10
    url: './images/products/Kids/kid10.jpg',
    title: 'G45',
    description: 'Complements to decorate and complete the room of your child or boy to the ground and suspended bedside tables, chest of drawers with tray tables and ottomans upholstered in removable fabric.'
  },
  { // product 11
    url: './images/products/Kids/kid11.jpg',
    title: 'TEDDY',
    description: 'Carefree games, cuddles, friendship. Caroti\’s modular beds with overhead storage are designed to respond to all needs of space and practicality without skimping on the reliability of high-quality, long-lasting materials.'
  },
  { // product 12
    url: './images/products/Kids/kid12.jpg',
    title: 'CATERINA ',
    description: 'A child\’s world is a magical one, filled with castles, adventures, fairies and superheroes! The SOGNI & AMORE collection keeps these dreams alive, designed with a child\’s world in mind, giving them the magic they seek.'
  },
  { // product 13
    url: './images/products/Kids/kid13.jpg',
    title: 'ALICE',
    description: 'Each piece in the collection is crafted with a combination of technology and artisan procedures to make sure it meets our rigorous quality standards. Solid wood, a wide range of specially-selected fabrics, and hand-painted decorations make every creation unique. We were all children once and every child is unique.'
  },
  { // product 14
    url: './images/products/Kids/kid14.jpg',
    title: 'GUGLIELMO',
    description: 'Solid wood, a wide range of specially-selected fabrics, and hand-painted decorations make every creation unique. We were all children once and every child is unique.'
  },
  { // product 15
    url: './images/products/Kids/kid15.jpg',
    title: 'SOLO BABY',
    description: 'Washable breathable polyester fibre mattress.'
  },
  { // product 16
    url: './images/products/Kids/kid16.jpg',
    title: 'NAVIGLI',
    description: 'Caroti restyles the nautical theme with a new astonishing outfit: the mood is eclectic, contemporary, sophisticated, chic, cosmopolitan but essentially italian style.'
  },
  { // product 17
    url: './images/products/Kids/kid17.jpg',
    title: 'LUDUS',
    description: 'Cozy children’s bed LUDUS brings beauty and comfort to the children’s room. The base is made in the form of slats in a metal frame. Blum push-to-open system is used for opening the drawers. Natural veneer finishing. Removable pillows can be used as poufs, instantly changing the setting for games or entertaining friends.'
  },
  { // product 18
    url: './images/products/Kids/kid18.jpg',
    title: 'SOFIA DRESSER',
    description: 'From the moment of birth, you make it your aim to give your child all the warmth, love and support that he needs. Sofia Collection was designed to help the parents and children in meeting their needs. Romantic, retro, a warm memory of childhood in a modern version, will combine perfectly with other furniture in your child\’s room.'
  },
  { // product 19
    url: './images/products/Kids/kid19.jpg',
    title: 'TIRAMOLLA',
    description: 'Composing to the infinity without limits this is our philosophy base for the TIRAMOLLA project. Through a structure of tubes and aluminium moulds, all your fantastic space mounts as a game, freeing the fantasy with the use of 32 colors, 5 melamines, 10 colors of metal and 6 colors of methacrylates, constructing closets under the beds, the beds over the closets, the bureaus under the beds or over the closets.'
  },
  { // product 20
    url: './images/products/Kids/kid20.jpg',
    title: '501 | Kids single bed',
    description: 'Single berth bed with a wood and parchment sailing-ship headboard and handmade "Wind Rose" decoration, for 85 x 195 cm. mattress.Available in a one-drawer version with pull-out shelf, or with 2 drawers, or plain version for 95 x 195 cm. mattress.'
  },
  { // product 21
    url: './images/products/Kids/kid21.jpg',
    title: '2MUCH!',
    description: 'Two beds in the space of one, so you\’ve got all the room you need during the day. And in the evening, in the blink of an eye, there are two beds, because the second bed is fitted with swivel castors that make it easy to move. Choose the colour and add a couple of cushions and it will become the focal point of the room.'
  },
  { // product 22
    url: './images/products/Kids/kid22.jpg',
    title: 'DREAM ON',
    description: 'Normal 0 14 false false false IT X-NONE X-NONE Dream on is a single bed with a linear and modern design that favours the pursuit of elemental comfort. This solution makes for a functional bedroom environment marked by a special metropolitan charm.'
  },
  { // product 23
    url: './images/products/Kids/kid23.jpg',
    title: 'Storage chests',
    description: 'The world of LAGO sideboard storage has expanded to include new modular 36e8 Glass modules that integrate both the painted and Wildwood 36e8 storage. They are stand-alone pieces that integrate with the other elements without needing to be mounted on the wall, adding lightness and deep reflections to the space.'
  },
  { // product 24
    url: './images/products/Kids/kid24.jpg',
    title: 'STABLE',
    description: 'Bed and box shelves composed of boxes including boxes for the horses and barns for the farm. This unique collection offers a vast playground for children who can imagine a whole new world for their horses!'
  },
  { // product 25
    url: './images/products/Kids/kid25.jpg',
    title: 'USM HALLER STORAGE',
    description: 'Flexible furnishing solutions that grow with your child. Children love bright colors and need a lot of storage space. USM offers furnishing solutions that grow with us, that can be configured flexibly and that accompany us throughout our lives.'
  },
  ],
  [ // category 8
  { // product 1
    url: './images/products/Storage/storage.jpg',
    title: 'UNICA',
    description: 'UNICA is a swivel modular walnut shelving system. Its design is based on modular system consisting of shelves and rods with different sizes. The system stands due to a central base in which you can alternate fixed shelves to the wall with floating shelves, providing strength and flexibility to the structure at the same time.'
  },
  { // product 2
    url: './images/products/Storage/storage2.jpg',
    title: 'FREEDOM',
    description: 'Freedom is a bookshelf in solid wood, made up of modular components that can be stacked and pulled together using special mounting hardware. 1,5 cm solid wood and dovetail joints charactherized each element.'
  },
  { // product 3
    url: './images/products/Storage/storage3.jpg',
    title: '505 UP SYSTEM',
    description: '505 UP SYSTEM, the new Collection represents the heart of contemporary living needs, where domestic spaces are versatile, multifunctional, and can be adapted and modelled according to use. This is the common thread that has led to the total reinterpretation of one of the company’s icons, the 505 system, which in 2021 has found its upgrade in the 505 Up.'
  },
  { // product 4
    url: './images/products/Storage/storage4.jpg',
    title: 'UNLIMITED',
    description: 'Unlimited is an open floor-ceiling mounted bookcase.'
  },
  { // product 5
    url: './images/products/Storage/storage5.jpg',
    title: 'EIFFEL SHELF',
    description: 'Based on a simple layering principal, Depping & Jørgensen have created a flexible and multifunctional range of shelving units and tables using cast aluminium leg modules with powder-coated MDF square, triangular or rectangular plates in different sizes.'
  },
  { // product 6
    url: './images/products/Storage/storage6.jpg',
    title: 'FRAME-SHIFT',
    description: 'Frame-Shift is a modular bookcase, made up of shelves in Alpi® veneered MDF, complete with guides for sliding doors in black anodized extruded aluminum. Uprights in sheet steel, powder coated in matt black.'
  },
  { // product 7
    url: './images/products/Storage/storage7.jpg',
    title: 'FLOREANA',
    description: 'Floreana is a system of vertical bookcases proposed in three different heights made with the repetition of a module.'
  },
  { // product 8
    url: './images/products/Storage/storage8.jpg',
    title: 'D90',
    description: 'Boisserie and bookcase.'
  },
  { // product 9
    url: './images/products/Storage/storage9.jpg',
    title: 'PRISM DIVIDER',
    description: 'Prism Divider is a modular high level bookcase in “Colore” Frisè Walnut. Satin brass metal parts. Available with two or three shelves. Placing together two or more modules allow to create various compositions.'
  },
  { // product 10
    url: './images/products/Storage/storage10.jpg',
    title: 'SAILOR',
    description: 'SAILOR is a bookcase inspired by the world of boating, which allows maximum freedom for floor-to-ceiling or wall mounted compositions.Steel uprights with hexagonal section 25 mm, fitted with holes having a center to center distance of 38.5 cm (35 cm of useful space) to install the shelves, and an additional wall fixing spacer, for greater structural rigidity (for both versions). Uprights finishes: matt transparent liquid painted steel or brass coloured steel with matt transparent finish.'
  },
  { // product 11
    url: './images/products/Storage/storage11.jpg',
    title: 'RAFIKI',
    description: 'RAFIKI is a bookcase designed by Draga&Aurel. Struttura in metallo ottonato anticato.'
  },
  { // product 12
    url: './images/products/Storage/storage12.jpg',
    title: 'SINAPSI',
    description: 'Sinapsi is the modular shelf system created by the Chilean artist Sebastian Errazuriz and inspired by the electrical impulses of brain cells. The result is a single lacquered-polyurethane element designed to organically decorate your wall without any constraints. Simply repeat the various Synapsi combinations, side by side, rotating, or mirroring them to create many different compositions and decorate walls using your own imagination.'
  },
  { // product 13
    url: './images/products/Storage/storage13.jpg',
    title: 'ILLUSION',
    description: 'Illusion is a modular wooden bookcase inspired by early 20th century Italian rationalist architecture. When combining the modules, the unique three-dimensional grid produces a very dynamic compositional effect thanks to the rotated arrangement of the vertical partitions which, in addition to defining the compartments, create a rhythmic unitary subdivision of the space with a minimalist appeal. The Illusion bookcase is wall-mounted, marking out the space.'
  },
  { // product 14
    url: './images/products/Storage/storage14.jpg',
    title: 'NUAGE À PLOTS',
    description: 'Nuage à Plots bookcase by Charlotte Perriand – Cassina I Maestri Collection.Charlotte Perriand, a true forerunner of new furnishing logics, never stopped studying the topic of containers and bookcases during her long career as an architect. In the mid-1950s, she started working on the concept of the Nuage family of bookcases and containers, reissued by Cassina since 2012.'
  },
  { // product 15
    url: './images/products/Storage/storage15.jpg',
    title: 'ALBA',
    description: 'Alba is a bookcase for exhibiting and containing, with an extraordinary creating versatility. The glass colored shelves allow to create round compositions, thanks to the fixing with one single joining element. The colored glass half circle-shape element creates also a geometric decoration, in addition to the function of hanging the books.Frame in metal and shelves in colored glass.'
  },
  { // product 16
    url: './images/products/Storage/storage16.jpg',
    title: 'MILONGA',
    description: 'Milonga is a bookcase with long legs, set with a delicate cadence between spaces. Either as a partition between rooms or, more traditionally, against a wall, this is an indispensable piece for organizing your home library. As well as being technical, Milonga is bold and distinctive, and plays on the colours of the tubes and the layout of the shelves. Indeed, it is the sequence of the shelves that gives the bookcase its sense of movement, echoing the rhythm of the lines printed in the exercise books of our childhood.'
  },
  { // product 17
    url: './images/products/Storage/storage17.jpg',
    title: 'COLONNATA',
    description: 'Freestanding divider marble bookcase.'
  },
  { // product 18
    url: './images/products/Storage/storage18.jpg',
    title: 'DOMINO EXPO',
    description: 'Domino Expo is a metal column fixed to the wall or forced between floor and ceiling. Thick shelf in canaletta walnut with central or off-centred hole.'
  },
  { // product 19
    url: './images/products/Storage/storage19.jpg',
    title: 'JACK',
    description: 'Jack is the result of the first collaboration between B&B Italia and Michael Anastassiades. Known for his skills in working with light, the Cypriot designer has designed a modular bookcase system with a striking degree of technological perfection.'
  },
  { // product 20
    url: './images/products/Storage/storage20.jpg',
    title: 'TURNER',
    description: 'Created by the masterful architect and designer Gianfranco Frattini (1926-2004), one of the trailblazers of the golden era of Italian design, the Turner swivel bookcase first saw the light in 1963 as Modello 823.'
  },
  { // product 21
    url: './images/products/Storage/storage21.jpg',
    title: 'CROSSING',
    description: 'Crossing is a versatile modular system of panels with which to create wall-mounted shelving. Totally adjustable along the three dimensional axes, it can support up to 400 kg.'
  },
  { // product 22
    url: './images/products/Storage/storage22.jpg',
    title: 'PRIMITIVE',
    description: 'The Primitive bookshelf was one of the strongest and most iconic products designed by Studio Nucleo. Initially made as a limited edition product, this bookshelf is now industrialized by Qeeboo and re-proposed in a polyethylene version with rotational molding in order to make it accessible to everybody. The product consists of a module that can create sculptural representations.'
  },
  { // product 23
    url: './images/products/Storage/storage23.jpg',
    title: 'TYKE',
    description: 'Shelving system. Material: uprights in steel tube painted in polyester powder; shelves in steel plate painted in polyester powder; feet and caps in polypropylene.'
  },
  { // product 24
    url: './images/products/Storage/storage24.jpg',
    title: 'QUANTUM',
    description: 'Bookcases made of boxes of different sizes in transparent 10 mm extralight tempered glass, glued at 45° and deliberately overlapped in a misaligned and irregular way.'
  },
  { // product 25
    url: './images/products/Storage/storage25.jpg',
    title: 'EMY',
    description: 'The Emy bookshelf is the piece of furniture that expands and maximizes storage space without taking up much space in your office, study, library, or reading nook. With multiple tiers and a swanky S-style design, this storage unit provides you with versatility and convenience.'
  },
  { // product 26
    url: './images/products/Storage/storage26.jpg',
    title: 'VIRGO',
    description: 'Virgo is a “living” structure which becomes a bookcase but, in fact, leads us to think about concave and convex surfaces relation as about the energy of a tightrope.'
  },
  
  ],
  [ // category 9
  { // product 1
    url: './images/products/StorageWall/wall.jpg',
    title: 'SYSTEM 01',
    description: 'SYSTEM 01 is a modular wall system with a combination of boiseries, shelves and storage units. Each element includes an adjustable concealed aluminium structure with patented couplings.'
  },
  { // product 2
    url: './images/products/StorageWall/wall2.jpg',
    title: 'C-SYSTEM',
    description: 'Loom program doors is a storage wall with top and base thickness 4 cm, shelves thicknes 1,5 cm solidwood veneered. Sides in 1,5 cm wood veneered.'
  },
  { // product 3
    url: './images/products/StorageWall/wall3.jpg',
    title: 'LOOM PROGRAM DOORS',
    description: 'Armchair, massive iroko wooden structure, oil treated. Backrest in polypropylene in the colours black, cafe latte, caramel, terra brown. Outdoor and Indoor use.'
  },
  { // product 4
    url: './images/products/StorageWall/wall4.jpg',
    title: 'FLAVOUR LIVING',
    description: 'Flavour Living 2 is a sectional wall-mounted storage wall, honey oak color.'
  },
  { // product 5
    url: './images/products/StorageWall/wall5.jpg',
    title: 'PAB',
    description: 'It is the result of a very simple idea: a sheet folded in half and restrained by light ties, designed to be used as a bookshelf and top. In time, Pab has become a very successful system, and has grown from the original project into the wide range of configurations and different finishes that make up this year\'s current version.'
  },
  { // product 6
    url: './images/products/StorageWall/wall6.jpg',
    title: 'BENCH',
    description: 'Bench is an elegant wooden TV stand characterized by essential lines and the innate functionality of the Magnetika system. The back panel is in fact a metal panel covered in wood on which it is possible to apply shelves and magnetic accessories by Ronda Design as desired. The TV itself can be placed on the wooden shelf or fixed to the back with the magnetic TV holder accessory.'
  },
  { // product 7
    url: './images/products/StorageWall/wall7.jpg',
    title: 'WALL SYSTEM',
    description: 'Wall System is a wooden storage wall with bookcase.'
  },
  { // product 8
    url: './images/products/StorageWall/wall8.jpg',
    title: 'ELLE PLUS',
    description: 'Elleplus 10. Wooden boiserie covered by extralight mirror or smoked "grigio Italia" mirror or painted glass as per samples in the bright or satin version.'
  },
  { // product 9
    url: './images/products/StorageWall/wall9.jpg',
    title: 'FLOW',
    description: 'With the SYSTEM 18 modular system it is easy to create a space for the work area in the Living area and equip it with everything you need, such as wireless charging devices and integrated cable duct.'
  },
  { // product 10
    url: './images/products/StorageWall/wall10.jpg',
    title: 'AVENUE',
    description: 'Avenue is a modular system for contemporary living. A multifunctional design solution that can be arranged according to the type of space and current needs. Modular by nature, elements can be placed side by side to create wall systems with minimalist appeal.'
  },
  { // product 11
    url: './images/products/StorageWall/wall11.jpg',
    title: 'iWALL',
    description: 'Wall is a wall-mounted metal storage wall. Panels: Black phosphatized sheet steel. Shelves: Embossed aluminium colour'
  },
  { // product 12
    url: './images/products/StorageWall/wall12.jpg',
    title: 'GISELLE',
    description: 'Giselle is a modular metal structure that can be made according to the customer\'s project. Cabinet composed of containers and accessories dedicated to specific functions: shelves, trays, drawers with lacquered fronts.'
  },
  { // product 13
    url: './images/products/StorageWall/wall13.jpg',
    title: 'SMART LIVING',
    description: 'Smart Living 1 is a sectional wall-mounted storage wall in alpine white ash, mel lux glass door and air open elements in black metal.'
  },
  { // product 14
    url: './images/products/StorageWall/wall14.jpg',
    title: 'CUBIT',
    description: 'Cubit is a modular shelving system made from MDF. It consists of 28 formats in 8 depths and was made according to the exact standard measurements for book and music formats. Its satin lacquer finish makes Cubits look modern and timeless.'
  },
  { // product 15
    url: './images/products/StorageWall/wall15.jpg',
    title: 'MALMÖ WALLSYSTEM',
    description: 'Malmö storage System is a collection of shelves and TV panels that cover the walls and provide the room with elegance due to a seamless grid of the highest quality.'
  },
  { // product 16
    url: './images/products/StorageWall/wall16.jpg',
    title: 'UNIT A080',
    description: 'Atlante interprets innovative design using elements and furniture with distinctive planning features: diagonal lines, coloured or graphic inserts, original occasional furniture, hide-away solutions and rear-lighting systems.'
  },
  { // product 17
    url: './images/products/StorageWall/wall17.jpg',
    title: 'Lago',
    description: 'Sahara Noir polished XGlass fronts. Tortora lacquered structures. Sahara Noir polished XGlass niches.'
  },
  { // product 18
    url: './images/products/StorageWall/wall18.jpg',
    title: 'TONALE 281',
    description: 'Tonale 281 Power is a sectional storage wall with fold-away bed.'
  },
  { // product 19
    url: './images/products/StorageWall/wall19.jpg',
    title: 'LIVIA',
    description: 'Livia, self-supporting wooden storage wall.'
  },
  { // product 20
    url: './images/products/StorageWall/wall20.jpg',
    title: 'INTRALATINA',
    description: 'Intralatina is a complete program of modular elements that allows infinite possibilities for a wall composition. The compositions are divided into three families: fixed to the wall, fixed to back panelling (possibly self-supporting), or held up by vertical supports.'
  },
  
  ]

]

