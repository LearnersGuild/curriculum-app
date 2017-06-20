// YOU DO NOT NEED THIS FILE!
// I used this to extract data from caviar and wanted to save

const extractBackgroundImage = node =>
  node.css('background-image').match(/url\("([^\)]+)"\)/)[1]

JSON.stringify({
  bannerImage: extractBackgroundImage($('.merchant-banner')),
  name: $('.merchant_name').text(),
  description: $('.merchant_description').text(),
  items: $('.offer-tile').toArray().map(node => {
    return {
      img: extractBackgroundImage($(node).find('.offer-tile_image')),
      title: $(node).find('.offer-tile_name').text().trim(),
      description: $(node).find('.offer-tile_description').text().trim(),
      price: $(node).find('.offer-tile_price').text().trim(),
      category: $(node).closest('.offer-tiles_category').find('.offer-tiles_category-name').text().trim(),
    }
  }),
}, null, 2)
