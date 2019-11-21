import React, { useState } from "react";

import { useApolloClient } from "@apollo/react-hooks";
import { SEARCH_CARDS } from "../DeckManager/DeckManagerSidebar/graphql";
import { toast } from "react-toastify";
import { Mana } from "@saeris/react-mana";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import {
  SearchFormWrapper,
  CardColorSelectionGroup,
  CardColorSelectionButton,
  NumberInputWithSelectComparison,
  SearchFormRarityWrapper,
  SearchFormSubmitButtonWrapper
} from "./styles";
import { SectionHeader } from "../../shared/Headers";
import {
  FormRow,
  FormRowTitle,
  FormRowContent,
  TextInput,
  StyledSelect,
  NumberInput
} from "../../shared/Forms";
import { Button } from "../../shared/Buttons";
import Checkbox from "../Checkbox";

const SearchForm = props => {
  const { setSearchResults, loadingResults, setLoadingResults } = props;
  const client = useApolloClient();

  const [rawSearchParams, setRawSearchParams] = useState({
    name: "",
    oracle: {
      type: "all",
      text: ""
    },
    type_line: {
      type: "any",
      text: ""
    },
    set: [],
    colors: {
      type: "exactly",
      colors: {
        white: false,
        blue: false,
        black: false,
        red: false,
        green: false,
        colorless: false
      }
    },
    mana_cost: "",
    power: {
      comparison: "less_than",
      value: ""
    },
    toughness: {
      comparison: "less_than",
      value: ""
    },
    cmc: {
      comparison: "less_than",
      value: ""
    },
    loyalty: {
      comparison: "less_than",
      value: ""
    },
    rarity: {
      common: false,
      uncommon: false,
      rare: false,
      mythic: false
    },
    is: {
      funny: false,
      commander: false
    }
  });

  const colorAbbreviationMap = {
    white: "W",
    blue: "U",
    black: "B",
    red: "R",
    green: "G",
    colorless: "C"
  };

  const formatSearchParams = () => {
    let {
      name,
      oracle,
      type_line,
      set,
      colors,
      mana_cost,
      power,
      toughness,
      loyalty,
      cmc,
      rarity: rarities,
      is
    } = rawSearchParams;
    let formattedSearchParams = {};

    // format the simpler params

    if (name) formattedSearchParams.name = name;
    if (oracle.text) formattedSearchParams.oracle = { ...oracle };
    if (type_line.text) formattedSearchParams.type_line = { ...type_line };
    if (mana_cost) formattedSearchParams.mana_cost = mana_cost;
    if (power.value) formattedSearchParams.power = { ...power };
    if (toughness.value) formattedSearchParams.toughness = { ...toughness };
    if (loyalty.value) formattedSearchParams.loyalty = { ...loyalty };
    if (cmc.value) formattedSearchParams.cmc = { ...cmc };
    if (set.length !== 0) formattedSearchParams.set = set.split(",");

    // format colors

    let formattedColors = [];

    Object.keys(colors.colors).map(color => {
      if (colors.colors[color])
        formattedColors.push(colorAbbreviationMap[color]);
      return null;
    });

    if (formattedColors.length !== 0)
      formattedSearchParams.colors = {
        type: colors.type,
        colors: formattedColors
      };

    // format rarity

    let formattedRarities = [];

    Object.keys(rarities).map(rarity => {
      if (rarities[rarity]) formattedRarities.push(rarity);
      return null;
    });

    if (formattedRarities.length !== 0)
      formattedSearchParams.rarity = formattedRarities;

    // format 'is'

    let formattedIs = [];

    Object.keys(is).map(option => {
      if (is[option]) formattedIs.push(option);
      return null;
    });

    if (formattedIs.length !== 0) formattedSearchParams.is = formattedIs;

    return formattedSearchParams;
  };

  const searchCards = async submitEvent => {
    submitEvent.preventDefault();
    setLoadingResults(true);
    const { data, errors } = await client.query({
      query: SEARCH_CARDS,
      variables: {
        searchParams: formatSearchParams()
      },
      errorPolicy: "all"
    });

    if (errors) {
      setLoadingResults(false);
      errors.forEach(error => {
        return toast.error(error.message);
      });
    } else {
      setLoadingResults(false);
      setSearchResults(data.searchCards.cards);
    }
  };

  const renderCardNameField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Card Name</h4>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="text"
            value={rawSearchParams.name}
            onChange={e =>
              setRawSearchParams({ ...rawSearchParams, name: e.target.value })
            }
          />
        </FormRowContent>
      </FormRow>
    );
  };

  const renderCardTextField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Card Text</h4>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="text"
            value={rawSearchParams.oracle.text}
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                oracle: {
                  type: rawSearchParams.oracle.type,
                  text: e.target.value
                }
              })
            }
          />

          <StyledSelect
            defaultValue={rawSearchParams.oracle.type}
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                oracle: {
                  type: e.target.value,
                  text: rawSearchParams.oracle.text
                }
              })
            }
          >
            <option value="all">All</option>
            <option value="exact">Exact</option>
            <option value="any">Any</option>
          </StyledSelect>
        </FormRowContent>
      </FormRow>
    );
  };

  const renderCardColorsField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Colors</h4>
        </FormRowTitle>
        <FormRowContent>
          <CardColorSelectionGroup>
            <CardColorSelectionButton
              selected={rawSearchParams.colors.colors.white}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: {
                      ...rawSearchParams.colors.colors,
                      white: !rawSearchParams.colors.colors.white
                    }
                  }
                });
              }}
            >
              <Mana symbol={"w"} shadow={false} cost={true} />
              White
            </CardColorSelectionButton>
            <CardColorSelectionButton
              selected={rawSearchParams.colors.colors.blue}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: {
                      ...rawSearchParams.colors.colors,
                      blue: !rawSearchParams.colors.colors.blue
                    }
                  }
                });
              }}
            >
              <Mana symbol={"u"} cost />
              Blue
            </CardColorSelectionButton>
            <CardColorSelectionButton
              selected={rawSearchParams.colors.colors.black}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: {
                      ...rawSearchParams.colors.colors,
                      black: !rawSearchParams.colors.colors.black
                    }
                  }
                });
              }}
            >
              <Mana symbol={"b"} cost />
              Black
            </CardColorSelectionButton>
            <CardColorSelectionButton
              selected={rawSearchParams.colors.colors.red}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: {
                      ...rawSearchParams.colors.colors,
                      red: !rawSearchParams.colors.colors.red
                    }
                  }
                });
              }}
            >
              <Mana symbol={"r"} cost />
              Red
            </CardColorSelectionButton>
            <CardColorSelectionButton
              selected={rawSearchParams.colors.colors.green}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: {
                      ...rawSearchParams.colors.colors,
                      green: !rawSearchParams.colors.colors.green
                    }
                  }
                });
              }}
            >
              <Mana symbol={"g"} cost />
              Green
            </CardColorSelectionButton>
            <CardColorSelectionButton
              selected={rawSearchParams.colors.colors.colorless}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  colors: {
                    type: rawSearchParams.colors.type,
                    colors: {
                      ...rawSearchParams.colors.colors,
                      colorless: !rawSearchParams.colors.colors.colorless
                    }
                  }
                });
              }}
            >
              <Mana symbol={"c"} cost />
              Colorless
            </CardColorSelectionButton>
          </CardColorSelectionGroup>

          <StyledSelect
            defaultValue="exactly"
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                colors: {
                  type: e.target.value,
                  colors: { ...rawSearchParams.colors.colors }
                }
              })
            }
          >
            <option value="exactly">Exactly</option>
            <option value="including">Including</option>
            <option value="at_most">At most</option>
          </StyledSelect>
        </FormRowContent>
      </FormRow>
    );
  };

  const renderCardTypeLineField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Type Line</h4>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="text"
            value={rawSearchParams.type_line.text}
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                type_line: {
                  type: rawSearchParams.type_line.type,
                  text: e.target.value
                }
              })
            }
          />
        </FormRowContent>
      </FormRow>
    );
  };

  const renderPowerField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Power</h4>
        </FormRowTitle>
        <FormRowContent>
          <NumberInputWithSelectComparison>
            <StyledSelect
              defaultValue={rawSearchParams.power.comparison}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  power: {
                    comparison: e.target.value,
                    value: rawSearchParams.power.value
                  }
                })
              }
            >
              <option value="less_than">less than</option>
              <option value="less_than_or_equal">less than or equal to</option>
              <option value="equal">equal to</option>
              <option value="greater_than_or_equal">
                greater than or equal to
              </option>
              <option value="greater_than">greater than</option>
            </StyledSelect>
            <NumberInput
              type="number"
              min={0}
              value={rawSearchParams.power.value}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  power: {
                    comparison: rawSearchParams.power.comparison,
                    value: e.target.value
                  }
                })
              }
            />
          </NumberInputWithSelectComparison>
        </FormRowContent>
      </FormRow>
    );
  };

  const renderToughnessField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Toughness</h4>
        </FormRowTitle>
        <FormRowContent>
          <NumberInputWithSelectComparison>
            <StyledSelect
              defaultValue={rawSearchParams.toughness.comparison}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  toughness: {
                    comparison: e.target.value,
                    value: rawSearchParams.toughness.value
                  }
                })
              }
            >
              <option value="less_than">less than</option>
              <option value="less_than_or_equal">less than or equal to</option>
              <option value="equal">equal to</option>
              <option value="greater_than_or_equal">
                greater than or equal to
              </option>
              <option value="greater_than">greater than</option>
            </StyledSelect>
            <NumberInput
              type="number"
              value={rawSearchParams.toughness.value}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  toughness: {
                    comparison: rawSearchParams.toughness.comparison,
                    value: e.target.value
                  }
                })
              }
            />
          </NumberInputWithSelectComparison>
        </FormRowContent>
      </FormRow>
    );
  };

  const renderCmcField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>CMC</h4>
        </FormRowTitle>
        <FormRowContent>
          <NumberInputWithSelectComparison>
            <StyledSelect
              defaultValue={rawSearchParams.cmc.comparison}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  cmc: {
                    comparison: e.target.value,
                    value: rawSearchParams.cmc.value
                  }
                })
              }
            >
              <option value="less_than">less than</option>
              <option value="less_than_or_equal">less than or equal to</option>
              <option value="equal">equal to</option>
              <option value="greater_than_or_equal">
                greater than or equal to
              </option>
              <option value="greater_than">greater than</option>
            </StyledSelect>
            <NumberInput
              type="number"
              value={rawSearchParams.cmc.value}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  cmc: {
                    comparison: rawSearchParams.cmc.comparison,
                    value: e.target.value
                  }
                })
              }
            />
          </NumberInputWithSelectComparison>
        </FormRowContent>
      </FormRow>
    );
  };

  const renderLoyaltyField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Loyalty</h4>
        </FormRowTitle>

        <FormRowContent>
          <NumberInputWithSelectComparison>
            <StyledSelect
              defaultValue={rawSearchParams.loyalty.comparison}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  loyalty: {
                    comparison: e.target.value,
                    value: rawSearchParams.loyalty.value
                  }
                })
              }
            >
              <option value="less_than">less than</option>
              <option value="less_than_or_equal">less than or equal to</option>
              <option value="equal">equal to</option>
              <option value="greater_than_or_equal">
                greater than or equal to
              </option>
              <option value="greater_than">greater than</option>
            </StyledSelect>
            <NumberInput
              type="number"
              value={rawSearchParams.loyalty.value}
              onChange={e =>
                setRawSearchParams({
                  ...rawSearchParams,
                  loyalty: {
                    comparison: rawSearchParams.loyalty.comparison,
                    value: e.target.value
                  }
                })
              }
            />
          </NumberInputWithSelectComparison>
        </FormRowContent>
      </FormRow>
    );
  };

  const renderRarityField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Rarity</h4>
        </FormRowTitle>
        <FormRowContent>
          <SearchFormRarityWrapper>
            <Checkbox
              selected={rawSearchParams.rarity.common}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  rarity: {
                    ...rawSearchParams.rarity,
                    common: !rawSearchParams.rarity.common
                  }
                });
              }}
            >
              Common
            </Checkbox>
            <Checkbox
              selected={rawSearchParams.rarity.uncommon}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  rarity: {
                    ...rawSearchParams.rarity,
                    uncommon: !rawSearchParams.rarity.uncommon
                  }
                });
              }}
            >
              Uncommon
            </Checkbox>
            <Checkbox
              selected={rawSearchParams.rarity.rare}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  rarity: {
                    ...rawSearchParams.rarity,
                    rare: !rawSearchParams.rarity.rare
                  }
                });
              }}
            >
              Rare
            </Checkbox>
            <Checkbox
              selected={rawSearchParams.rarity.mythic}
              onClick={() => {
                setRawSearchParams({
                  ...rawSearchParams,
                  rarity: {
                    ...rawSearchParams.rarity,
                    mythic: !rawSearchParams.rarity.mythic
                  }
                });
              }}
            >
              Mythic
            </Checkbox>
          </SearchFormRarityWrapper>
        </FormRowContent>
      </FormRow>
    );
  };

  const renderSetField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Set</h4>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="text"
            onChange={e =>
              setRawSearchParams({ ...rawSearchParams, set: e.target.value })
            }
          />
        </FormRowContent>
      </FormRow>
    );
  };

  const renderManaCostField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Mana Cost</h4>
        </FormRowTitle>
        <FormRowContent>
          <TextInput
            type="text"
            placeholder="e.g. {1}{W}{W}"
            onChange={e =>
              setRawSearchParams({
                ...rawSearchParams,
                mana_cost: e.target.value
              })
            }
          />
        </FormRowContent>
      </FormRow>
    );
  };

  const renderUnSetsField = () => {
    return (
      <FormRow>
        <FormRowTitle>
          <h4>Include Un-Sets?</h4>
        </FormRowTitle>

        <Checkbox
          selected={rawSearchParams.is.funny}
          onClick={() =>
            setRawSearchParams({
              ...rawSearchParams,
              is: { ...rawSearchParams.is, funny: !rawSearchParams.is.funny }
            })
          }
        />
      </FormRow>
    );
  };

  return (
    <SearchFormWrapper>
      <SectionHeader>
        <FontAwesomeIcon icon={faSearch} fixedWidth />
        Search
      </SectionHeader>
      <form onSubmit={searchCards}>
        {renderCardNameField()}
        {renderCardTextField()}
        {renderCardColorsField()}
        {renderCardTypeLineField()}
        {renderPowerField()}
        {renderToughnessField()}
        {renderCmcField()}
        {renderLoyaltyField()}
        {renderRarityField()}
        {renderSetField()}
        {renderManaCostField()}
        {renderUnSetsField()}

        <SearchFormSubmitButtonWrapper>
          <Button type="submit">
            <FontAwesomeIcon icon={faSearch} fixedWidth />
            {loadingResults ? "Searching..." : "Search"}
          </Button>
        </SearchFormSubmitButtonWrapper>
      </form>
    </SearchFormWrapper>
  );
};

export default SearchForm;
