class DataSet():
    def __init__(self, name: str, values: dict, owner):
        self.name = name
        self.values = self.getValues(values)
        self.owner = owner

    def getValues(self, values) -> list:
        if isinstance(values, dict):
            values_list = []
            for key, value in values.items():
                if 'data-' in key:
                    values_list.append(value)

            return values_list

        elif isinstance(values, list):
            return [x for x in values if 'data-' in x]

    def __str__(self) -> str:
        r = f'{self.name}:\n'
        r += f'{self.owner}\n'
        r += f'{self.values}\n'
        return r
