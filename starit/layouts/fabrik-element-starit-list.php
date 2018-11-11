<?php

defined('JPATH_BASE') or die;

$d = $displayData;
?>
<div class="btn-group">
    <button <?php echo $d->commentdata;?> data-fabrik-starit-formid="<?php echo $d->formId;?>"
        data-fabrik-starit="up" class="btn btn-small starit-up<?php echo $d->upActiveClass;?>">
        <?php echo FabrikHelperHTML::image('starit-up', 'list', $d->tmpl); ?>
    <span class="starit-count"><?php echo $d->countUp;?>
    </span>
    </button>
    <?php
    if ($d->showDown) :
        ?>
        <button <?php echo $d->commentdata;?> data-fabrik-starit-formid="<?php echo $d->formId;?>"
            data-fabrik-starit="down" class="btn btn-small starit-down<?php echo $d->downActiveClass;?>">
            <?php echo FabrikHelperHTML::image('starit-down', 'list', $d->tmpl); ?>
            <span class="starit-count"><?php echo $d->countDown;?></span>
        </button>
    <?php
    endif;
    ?>
</div>
