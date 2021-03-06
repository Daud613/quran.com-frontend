
/**
 * Based on: https://gist.github.com/mirague/c05f4da0d781a9b339b501f1d5d33c37/
 *
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';


// Create the IntlProvider to retrieve context for wrapping around.
// NOTE: Phantomjs requires usage of `var`
var intlProvider = new IntlProvider({ locale: 'en' }, {}); // eslint-disable-line
var intl = intlProvider.getChildContext(); // eslint-disable-line

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, intl);
}

/**
 * Export these methods.
 */
export function shallowWithIntl(node) {
  return shallow(nodeWithIntlProp(node), { context: intl });
}

export function mountWithIntl(node) {
  return mount(nodeWithIntlProp(node), {
    context: intl,
    childContextTypes: { intl: intlShape }
  });
}
