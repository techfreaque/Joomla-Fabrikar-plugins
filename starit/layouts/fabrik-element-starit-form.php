<?php

defined('JPATH_BASE') or die;

$d = $displayData;
?>
<?php
if ($d->j3) :
	?>
	<div class="btn-group">';
		<button <?php echo $d->commentdata;?> data-fabrik-starit-formid="<?php echo $d->formId;?>"
			data-fabrik-starit="up" class="btn btn-small starit-up<?php echo $d->upActiveClass;?>">
			<?php echo FabrikHelperHTML::image('heart', 'form', $d->tmpl); ?>
		<span class="starit-count"><?php echo $d->countUp;?>
		</span>
		</button>
		<?php
		if ($d->showDown) :
			?>
			<button <?php echo $d->commentdata;?> data-fabrik-starit-formid="<?php echo $d->formId;?>"
				data-fabrik-starit="down" class="btn btn-small starit-down<?php echo $d->downActiveClass;?>">
				<?php echo FabrikHelperHTML::image('starit-down', 'form', $d->tmpl); ?>
				<span class="starit-count"><?php echo $d->countDown;?></span>
			</button>
		<?php
		endif;
		?>

	</div>
<?php
else :
	?>
	<span style="color:#32d723;" id="count_staritup"><?php echo $d->countUp;?></span>
	<img src="<?php echo $d->imagepath . $d->imagefileup;?>" style="padding:0px 5px 0 1px;" alt="UP" id="staritup" />

	<?php
	if ($d->showDown) :
		?>
		<span style="color:#f82516;" id="count_staritdown"><?php echo $d->countDown;?></span>
		<img src="<?php echo $d->imagepath . $d->imagefiledown; ?>" style="padding:0px 5px 0 1px;" alt="DOWN" id="staritdown" />
	<?php
	endif;

endif;
?>

<input type="hidden" name="<?php echo $d->name;?>"
	id="<?php echo $d->id;?>" value="<?php echo $d->countDiff;?>"
	class="<?php echo $d->id;?>" />
