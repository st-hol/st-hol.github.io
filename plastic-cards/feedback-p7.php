<?php

$errors = array();
$form_data = array();

if ($_POST['name-p7'] == "")
    {
        $errors['name-p7'] = 'Введите Ваше имя';
    }

if ($_POST['phone-p7'] == "")
{
    $errors['name-p7'] = 'Введите Ваш телефон';
}

if (!empty($errors))
    {
        $form_data['success'] = false;
        $form_data['errors']  = $errors;
    }
else
    {
        $message = "<h3>Заявка с сайта ".$_SERVER['HTTP_HOST']."</h3>";

        foreach($_POST as $k => $v)
            {
                $message .= $k.": ".$v."<br />";
            }

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=utf8' . "\r\n";


     /*   if (mail('sdaf12fds21@gmail.com', 'Заявка с сайта '.$_SERVER['HTTP_HOST'], $message, $headers))
            {
                $form_data['success'] = true;
                $form_data['posted'] = "<p style='font-size:24px !important; margin:20px 0 !important;  color:#4260fd !important;'>Спасибо, мы свяжемся с Вами в ближайшее время!</p><style>.shedule-p{display:block;} .p7-title-cont, .congrad{visibility: hidden;}</style>";
            }
        else
            {
                $errors['name'] = 'Ошибка отправки письма';
            }*/
        if (mail('2332563@gmail.com', 'Заявка с сайта '.$_SERVER['HTTP_HOST'], $message, $headers))
            {
                $form_data['success'] = true;
                $form_data['posted'] = "<p style='font-size:24px !important; margin:20px 0 !important;  color:#4260fd !important;'>Спасибо, мы свяжемся с Вами в ближайшее время!</p> <style>.shedule-p{display:block;} .p7-title-cont, .congrad{visibility: hidden;}</style>";
            }
        else
            {
                $errors['name-p7'] = 'Ошибка отправки письма';
            }


        if (mail('gudeevnp@ya.ru', 'Заявка с сайта '.$_SERVER['HTTP_HOST'], $message, $headers))
            {
                $form_data['success'] = true;
                $form_data['posted'] = "<p style='font-size:24px !important; margin:20px 0 !important;  color:#4260fd !important;'>Спасибо, мы свяжемся с Вами в ближайшее время!</p><style>.shedule-p{display:block;} .p7-title-cont, .congrad{visibility: hidden;}</style>";
            }
        else
            {
                $errors['name-p7'] = 'Ошибка отправки письма';
            }




    }


echo json_encode($form_data);

?>