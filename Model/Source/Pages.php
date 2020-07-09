<?php
/**
 * @author @haihv433
 * @copyright Copyright (c) 2020 Goomento (https://store.goomento.com)
 * @package Goomento_Base
 * @link https://github.com/Goomento/GoogleAutoCompleteAddress
 */

namespace Goomento\GoogleAutoCompleteAddress\Model\Source;

/**
 * Class Pages
 * @package Goomento\GoogleAutoCompleteAddress\Model\Source
 */
class Pages implements \Magento\Framework\Data\OptionSourceInterface
{
    const CHECKOUT_LAYOUT = 'checkout_index_index';
    const CUSTOMER_ADDRESS_LAYOUT = 'customer_address_form';
    const ADMINHTML_CUSTOMER_ADDRESS_LAYOUT = 'customer_index_edit';

    /**
     * @return array|array[]
     */
    public function toOptionArray()
    {
        return [
            [
                'value' => self::CHECKOUT_LAYOUT,
                'label' => __('Checkout')
            ],
            [
                'value' => self::CUSTOMER_ADDRESS_LAYOUT,
                'label' => __('Customer Address')
            ],
            [
                'value' => self::ADMINHTML_CUSTOMER_ADDRESS_LAYOUT,
                'label' => __('Admin')
            ],
        ];
    }
}

