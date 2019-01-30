import * as _ from 'lodash';

/** Narzędzie do przetważania parametrów akcji */
export class QueryParamsUtil {

  /**
   * Serialize object with params to query string
   *
   * Exmample: params = { name: 'John Doe', commonIds: [1,2,3] }
   * in result will be 'name=John Doe&commonIds=1,2,3'
   *
   * @param params
   */
  static toParamsString(params): string {
    const resultQueryStrings = [];
    try {
      const keyList = _.keys(params);
      for (const key of keyList) {
        //  if (!_.isNull(params[key]) && !_.isObject(params[key]) && !_.isFunction(params[key])) {
        if (!_.isNull(params[key]) && !_.isFunction(params[key])) {
          if (_.isArray(params[key])) {
            if (params[key].length > 0) {
              resultQueryStrings.push(params[key].map(val => key + '=' + val).join('&'));
            }
          } else if (_.isString(params[key])) {
            if (params[key].length > 0) {
              resultQueryStrings.push(this.getQueryParamString(key, encodeURIComponent(params[key])));
            }
          } else {
            resultQueryStrings.push(this.getQueryParamString(key, params[key]));
          }
        }
      }
    } catch (e) {
      return '';
    }
    return resultQueryStrings.join('&');
  }

  /** Metoda konwertuje parametr `params` do JSON string'a */
  static stringify(params: { [key: string]: any }): string {
    return JSON.stringify(_.omitBy(params, _.isNil));
  }

  /** Method parsuje JSON string, budując obiekt opisany przekazanym parametrem `q` */
  static parse<P = { [key: string]: any }>(q: string): P {
    return JSON.parse(q) as P;
  }

  /**
   * Get Param Query String
   *
   * Example: input params key = 'name', value = 'John Doe'
   * Result will be 'name=John Doe'
   *
   * @param key
   * @param val
   * @returns {string}
   */
  private static getQueryParamString(key: string, val: string): string {
    return key + '=' + val;
  }

}
