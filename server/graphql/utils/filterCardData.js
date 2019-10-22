const filterCardData = fullCardData => {
  const requiredFields = [
    'scryfall_id',
    'layout',
    'name',
    'cmc',
    'colors',
    'color_identity',
    'legalities',
    'loyalty',
    'mana_cost',
    'lang',
    'set',
    'oracle_text',
    'power',
    'toughness',
    'type_line',
    'image_uris',
    'rarity',
    'set_name',
    'card_faces',
    'flavor_text',
    'collector_number'
  ];

  let filteredData = {
    scryfall_id: fullCardData.id,
    layout: null,
    name: null,
    cmc: null,
    colors: [],
    color_identity: [],
    legalities: null,
    loyalty: null,
    mana_cost: null,
    lang: null,
    set: null,
    oracle_text: null,
    power: null,
    toughness: null,
    type_line: null,
    image_uris: null,
    rarity: null,
    set_name: null,
    flavor_text: null,
    card_faces: [],
    collector_number: null
  };

  requiredFields.map(field => {
    if (fullCardData[field]) {
      filteredData[field] = fullCardData[field];
    }
  });

  return filteredData;
};

module.exports = filterCardData;
