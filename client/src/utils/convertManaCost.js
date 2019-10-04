import React from 'react';
import { Mana } from '@saeris/react-mana';

const regex = /\{[\w/]+\}/gm;

const conversionMap = {
  '{0}': '0',
  '{1}': '1',
  '{2}': '2',
  '{3}': '3',
  '{4}': '4',
  '{5}': '5',
  '{6}': '6',
  '{7}': '7',
  '{8}': '8',
  '{9}': '9',
  '{10}': '10',
  '{11}': '11',
  '{12}': '12',
  '{13}': '13',
  '{14}': '14',
  '{15}': '15',
  '{16}': '16',
  '{17}': '17',
  '{18}': '18',
  '{19}': '19',
  '{20}': '20',
  '{100}': '100',
  '{1000000}': '1000000',
  '{∞}': 'infinity',
  '{W}': 'w',
  '{U}': 'u',
  '{B}': 'b',
  '{R}': 'r',
  '{G}': 'g',
  '{C}': 'c',
  '{S}': 's',
  '{X}': 'x',
  '{Y}': 'y',
  '{Z}': 'z',
  '{W/U}': 'wu',
  '{W/B}': 'wb',
  '{B/R}': 'br',
  '{B/G}': 'bg',
  '{U/B}': 'ub',
  '{U/R}': 'ur',
  '{R/G}': 'rg',
  '{R/W}': 'rw',
  '{G/W}': 'gw',
  '{G/U}': 'gu',
  '{2/W}': '2w',
  '{2/U}': '2u',
  '{2/B}': '2b',
  '{2/R}': '2r',
  '{2/G}': '2g',
  '{P}': 'p',
  '{W/P}': 'wp',
  '{U/P}': 'up',
  '{B/P}': 'bp',
  '{R/P}': 'rp',
  '{G/P}': 'gp'
};

const convertManaCost = (manaCostString, cost = true, shadow = false) => {
  let icons = [];
  let manaCostArray = manaCostString.match(regex);

  manaCostArray.forEach((costSymbol, index) => {
    icons.push(
      <Mana key={`${manaCostString}__${index}`} symbol={conversionMap[costSymbol]} cost={cost} shadow={shadow} />
    );
    return;
  });

  return <span>{icons}</span>;
};

export default convertManaCost;
