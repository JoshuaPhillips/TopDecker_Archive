const comparisonMap = {
  less_than: '<',
  less_than_or_equal: '<=',
  equal: '=',
  greater_than_or_equal: '>=',
  greater_than: '>'
};

const generateNameString = nameParam => {
  return `${nameParam.toLowerCase()} `;
};

const generateOracleTextString = oracleTextParam => {
  const { type, text } = oracleTextParam;
  let oracleTextString = '(';
  let searchTerms = text
    .trim()
    .replace(/  +/g, ' ')
    .split(' ')
    .map(word => {
      return `oracle:${word}`;
    });

  switch (type) {
    case 'all':
      oracleTextString += searchTerms.join(' ');
      break;

    case 'exact':
      oracleTextString += `oracle:"${text}"`;
      break;

    case 'any':
      oracleTextString += searchTerms.join(' or ');
      break;

    default:
      break;
  }

  oracleTextString += ')';

  return oracleTextString;
};

const generateTypeLineString = typeLineParam => {
  let typeLineString = '(';
  let searchWords = typeLineParam.text
    .trim()
    .replace(/ +/g, '')
    .split(',')
    .map(word => {
      return `type:${word}`;
    });

  switch (typeLineParam.type) {
    case 'all':
      typeLineString += searchWords.join(' ');
      break;

    case 'any':
      typeLineString += searchWords.join(' or ');
      break;

    default:
      break;
  }

  typeLineString += ')';
  return typeLineString;
};

const generateColorsString = colorsParam => {
  let colorString = '(';

  switch (colorsParam.type) {
    case 'exactly':
      colorString += `color=${colorsParam.colors.join('')}`;
      break;

    case 'including':
      colorString += `color>=${colorsParam.colors.join('')}`;
      break;

    case 'at_most':
      colorString += `color<=${colorsParam.colors.join('')}`;
      break;

    default:
      break;
  }

  colorString += ')';
  return colorString;
};

const generateIdentityString = identityParam => {
  let identityString = '(';

  switch (identityParam.type) {
    case 'exactly':
      identityString += `id=${identityParam.colors.join('')}`;
      break;

    case 'including':
      identityString += `id>=${identityParam.colors.join('')}`;
      break;

    case 'at_most':
      identityString += `id<=${identityParam.colors.join('')}`;
      break;

    default:
      break;
  }

  identityString += ')';
  return identityString;
};

const generateCommanderString = commanderParam => {
  return `(commander:${commanderParam.join('')})`;
};

const generateManaCostString = manaCostParam => {
  return `(mana:${manaCostParam})`;
};

const generateCmcString = cmcParam => {
  return `(cmc${comparisonMap[cmcParam.comparison]}${cmcParam})`;
};

const generateFormatsString = formatsParam => {
  let formatsString = '(';

  formatsParam.map(item => {
    formatsString += `${item.legality}:${item.format}`;
  });

  formatsString += ')';

  return formatsString;
};

const generateSetString = setParam => {
  return `(set:${setParam})`;
};

const generateRarityString = rarityParam => {
  let rarityString = '(';

  rarityTerms = rarityParam.map(rarity => {
    return `rarity:${rarity}`;
  });

  rarityString += rarityTerms.join(' or ');
  rarityString += ')';

  return rarityString;
};

const generatePowerString = powerParam => {
  return `(pow${comparisonMap[powerParam.comparison]}${powerParam.value})`;
};

const generateToughnessString = toughnessParam => {
  return `(tou${comparisonMap[toughnessParam.comparison]}${toughnessParam.value})`;
};

const generateLoyaltyString = loyaltyParam => {
  return `(loy${comparisonMap[loyaltyParam.comparison]}${loyaltyParam.value})`;
};

const generateIsString = isParam => {
  let isString = '(';

  isTerms = isParam.map(term => {
    return `is:${term}`;
  });

  isString += isTerms.join(' ');
  isString += ')';
  return isString;
};

const generateSearchString = searchParams => {
  let searchString = '';

  Object.keys(searchParams).map(param => {
    switch (param) {
      case 'name':
        searchString += generateNameString(searchParams.name);
        break;

      case 'oracle':
        searchString += generateOracleTextString(searchParams.oracle);
        break;

      case 'type_line':
        searchString += generateTypeLineString(searchParams.type_line);
        break;

      case 'colors':
        searchString += generateColorsString(searchParams.colors);
        break;

      case 'identity':
        searchString += generateIdentityString(searchParams.identity);
        break;

      case 'commander':
        searchString += generateCommanderString(searchParams.commander);
        break;

      case 'mana_cost':
        searchString += generateManaCostString(searchParams.mana_cost);
        break;

      case 'cmc':
        searchString += generateCmcString(searchParams.cmc);
        break;

      case 'formats':
        searchString += generateFormatsString(searchParams.formats);
        break;

      case 'set':
        searchString += generateSetString(searchParams.set);
        break;

      case 'rarity':
        searchString += generateRarityString(searchParams.rarity);
        break;

      case 'power':
        searchString += generatePowerString(searchParams.power);
        break;

      case 'toughness':
        searchString += generateToughnessString(searchParams.toughness);
        break;

      case 'loyalty':
        searchString += generateLoyaltyString(searchParams.loyalty);
        break;

      case 'is':
        searchString += generateIsString(searchParams.is);
        break;

      default:
        break;
    }
  });

  return searchString;
};

module.exports = generateSearchString;
