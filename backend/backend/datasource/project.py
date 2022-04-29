class Project:
    def __init__(self, project_root_path):
        self.project_root_path = project_root_path
        self.name = ""

    def get_info(self):
        f = open(self.project_root_path + "/texts/info.txt")
        return f.read()

    def update_info(self, new_info):
        pass # TODO

    def get_description(self):
        f = open(self.project_root_path + "/texts/description.txt")
        return f.read()

    def update_description(self, new_info):
        pass # TODO

    def get_name(self):
        return self.name

    def get_issues(self):
        pass # TODO