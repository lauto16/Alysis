class DataSet():
    def __init__(self, name: str, values: dict, owner):
        """
        This class is meant to represent a dataset that might contain alphanumeric values.

        self.name(str) The dataset's name.
        self.values(list): List that contains the dataset values.
        self.owner(User): Contains the User that owns the dataset.
        self.is_numeric(bool):
            If True -> all the values from the dataset can be converted to float
            If False -> there's at least one value that can't be converted to float.
        """

        self.name = name
        self.values = self.getValues(values)
        self.owner = owner
        self.is_numeric = self.isNumeric(self.values)

    def getValues(self, values: dict) -> list:
        """
        Gets all the values whose key name starts with 'data-' into a list. 

        Args:
            values (dict): A dict that might contain various keys, but should have at least one key whose
                           name starts with 'data-'. Otherwise it will return an empty list.

        Returns:
            list: A list containing all the dataset's values
        """

        values_list = []
        for key, value in values.items():
            if 'data-' in key:
                values_list.append(value)

        return values_list

    def isNumeric(self, values: list) -> bool:
        """
        Returns whether a list of values is 'Numeric' or 'Not numeric'
        It works by looking if a value on the list throws an error when trying to convert it into 
        float.

        Args:
            values (list): A list of values.

        Returns:
            bool: 
                if True: The list is numeric, so all it's values are numbers.
                if False: The list is not numeric, so it contains at least a value that is not 
                        a number.
        """

        for element in values:
            try:
                float(element)
            except ValueError:
                return False
        return True

    def __str__(self) -> str:
        r = f'{self.name}:\n'
        r += f'{self.owner}\n'
        r += f'{self.values}\n'
        return r
