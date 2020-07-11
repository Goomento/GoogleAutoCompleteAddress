<?php
/**
 * @author @haihv433
 * @copyright Copyright (c) 2020 Goomento (https://store.goomento.com)
 * @package Goomento_GoogleAutoCompleteAddress
 * @link https://github.com/Goomento/GoogleAutoCompleteAddress
 */

namespace Goomento\GoogleAutoCompleteAddress\Helper;

use Magento\Framework\App\Helper\Context;

/**
 * Class Config
 * @package Goomento\GoogleAutoCompleteAddress\Helper
 */
class Config extends \Goomento\Base\Helper\Config
{
    public function __construct(Context $context, array $scope = [])
    {
        parent::__construct($context, $this->declareScope());
    }

    /**
     * @return array|string[]
     */
    protected function declareScope() : array
    {
        return [
            'goomento_google_autocomplete_address',
            'general'
        ];
    }
}
