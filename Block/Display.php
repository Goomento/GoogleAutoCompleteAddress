<?php
/**
 * @author @haihv433
 * @copyright Copyright (c) 2020 Goomento (http://goomento.com)
 * @package Goomento_GoogleAutoCompleteAddress
 */

namespace Goomento\GoogleAutoCompleteAddress\Block;

use Goomento\GoogleAutoCompleteAddress\Helper\Config;
use Magento\Framework\View\Element\Template;

/**
 * Class Display
 * @package Goomento\GoogleAutoCompleteAddress\Block
 */
class Display extends Template
{
    /**
     * @return Display
     */
    protected function _prepareLayout()
    {
        if (Config::staticIsActive()) {
            $layout = $this->getRequest()->getFullActionName();
            if (in_array($layout, Config::staticConfigGetArray('pages'))) {
                $this->setTemplate('Goomento_GoogleAutoCompleteAddress::display.phtml');
            }
        }

        return parent::_prepareLayout();
    }
}
