<?php
//every variable starts with a dollar sign
$num = 2;
$foo = $num . " be";
$bar = "or not" .$num . "be.";

echo $foo ." ". $bar; //like print the dot means stick things together
echo "\n"; // its interpreted as html at this point, so it won't add a new line 

echo $num * $num * $num;

$arr = [1,1,2,3,5,8];

$arr2 = [
    "first" => "Tom",
    "second" => "Bipin",
    "best" => "DS"
];
// with this sign => to indicate key and value, associate array

if (true) {
    echo "TURE \n";
} else{
    echo "FALSE \n";
}

while (true) {
    break;
}

echo "<ul>";
foreach ($arr2 as $key => $val) {
    echo "<li>".$key." is ".$val."</li>\n";
}
echo "</ul>";

//$arr printed out as json => json_encode
echo json_encode($arr);

echo json_encode(
    $arr2,
    JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR
);
//flags, not int, like json_pretty_print, all upper case for php constants

//variable naming
//PHP and JS: camelCase (we will use for variables and function)
//constants: UPPER_SNAKE_CASE
//snake_case
//PascalCase (We'll use for class names)
//kebab-case

