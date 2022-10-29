import pandas as pd
from matplotlib import ticker
import matplotlib.pyplot as plt


def read_results(file):
    with open(file) as file:
        return list(map(int, list(filter(lambda x: len(x) > 0, file.read().split('\n')))))


test_runner = ['hjemmesnekret', 'jest']
data = {'hjemmesnekret': read_results('hjemmesnekret.txt'),
        'jest':  read_results('jest.txt')}
results = pd.DataFrame(data=data)


results.plot(kind='bar')

plt.ylabel('Milliseconds to run tests')
plt.title('Time to run all unit tests in tinyeth')
plt.gca().yaxis.set_major_formatter(ticker.FormatStrFormatter('%i ms'))
plt.gca().xaxis.set_tick_params(rotation=0)
#plt.show()
plt.savefig('plot.png')